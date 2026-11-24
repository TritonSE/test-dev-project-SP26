import { Types } from "mongoose";

import Member from "../models/Member";
import Submission from "../models/Submission";
import Team from "../models/Team";
import { deleteFileFromS3, getPresignedImageUrl, uploadFileToS3 } from "../utils/s3";

import type { Request, Response } from "express";

type SubmissionTagInput = {
  memberId: string;
  photoIndex: number;
  x: number;
  y: number;
};

type ParsedSubmissionBody = {
  eventName: string;
  date: string;
  location: string;
  tags: SubmissionTagInput[];
};

const resolvePhotoUrls = async (photoKeys: string[]) =>
  Promise.all(photoKeys.map(async (key) => getPresignedImageUrl(key)));

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter: Record<string, unknown> = {};
    if (status && typeof status === "string") {
      filter.status = status;
    }
    const submissions = await Submission.find(filter);

    const submissionsWithUrls = await Promise.all(
      submissions.map(async (submission) => {
        const photoUrls = await resolvePhotoUrls(submission.photoKeys);
        return {
          ...submission.toObject(),
          photoUrls,
        };
      }),
    );

    res.status(200).json(submissionsWithUrls);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

export const createSubmission = async (req: Request, res: Response) => {
  const files = Array.isArray(req.files) ? req.files : [];
  const { submission } = req.body as { submission: ParsedSubmissionBody };
  const { eventName, date, location, tags } = submission;

  const photoKeys: string[] = [];
  try {
    const memberIds = tags.map((tag) => new Types.ObjectId(tag.memberId));
    const taggedMembers = await Member.find({ _id: { $in: memberIds } });
    if (taggedMembers.length !== memberIds.length) {
      return res.status(400).json({ error: "One or more tagged members could not be found." });
    }

    const membersById = new Map(taggedMembers.map((member) => [member._id.toString(), member]));
    const firstTaggedMember = membersById.get(tags[0].memberId);
    if (!firstTaggedMember) {
      return res.status(400).json({ error: "The submitter could not be found." });
    }

    const pointsByTeam = new Map<string, number>();
    for (const member of taggedMembers) {
      const teamId = member.team.toString();
      pointsByTeam.set(teamId, (pointsByTeam.get(teamId) ?? 0) + 1);
    }

    const teamIds = [...pointsByTeam.keys()];
    const existingTeams = await Team.find({ _id: { $in: teamIds } }).select("_id");
    if (existingTeams.length !== teamIds.length) {
      return res.status(400).json({ error: "One or more tagged member teams could not be found." });
    }

    const uploads = await Promise.allSettled(
      files.map(async (file) => {
        return await uploadFileToS3(file.buffer, file.originalname, file.mimetype);
      }),
    );
    for (const result of uploads) {
      if (result.status === "fulfilled") {
        photoKeys.push(result.value);
      }
    }
    const failedUpload = uploads.find((result) => result.status === "rejected");
    if (failedUpload?.status === "rejected") {
      throw failedUpload.reason;
    }

    const savedSubmission = await new Submission({
      photoKeys,
      eventName: eventName.trim(),
      date: new Date(date),
      location: location.trim(),
      pointAllocation: teamIds.map((team) => ({ team, points: pointsByTeam.get(team) ?? 0 })),
      tags: tags.map(({ memberId, photoIndex, x, y }) => ({
        member: memberId,
        photoIndex,
        x,
        y,
      })),
      member: firstTaggedMember._id,
      status: "pending",
    }).save();

    res.status(201).json(savedSubmission);
  } catch (error) {
    const cleanupResults = await Promise.allSettled(
      photoKeys.map(async (key) => {
        await deleteFileFromS3(key);
      }),
    );
    cleanupResults.forEach((result) => {
      if (result.status === "rejected") {
        console.error("Failed to clean up submission photo:", result.reason);
      }
    });
    console.error("Error creating submission:", error);
    res.status(500).json({ error: "Failed to create submission" });
  }
};

type UpdateSubmissionBody = Partial<{
  photoKeys: string[];
  eventName: string;
  date: Date;
  location: string;
  pointAllocation: { team: string; points: number }[];
  status: "pending" | "approved" | "rejected";
  member: string;
}>;

export const updateSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      req.body as UpdateSubmissionBody,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedSubmission) {
      return res.status(404).json({ error: "Submission not found." });
    }

    const photoUrls = await resolvePhotoUrls(updatedSubmission.photoKeys);

    res.status(200).json({ ...updatedSubmission.toObject(), photoUrls });
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({ error: "Failed to update submission" });
  }
};

export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSubmission = await Submission.findByIdAndDelete(id);
    if (!deletedSubmission) {
      return res.status(404).json({ error: "Submission not found." });
    }
    res.status(200).json({ message: "Submission deleted successfully." });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ error: "Failed to delete submission" });
  }
};
