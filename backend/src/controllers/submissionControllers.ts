import Submission from "../models/Submission";
import { getPresignedImageUrl } from "../utils/s3";

import type { Request, Response } from "express";

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
  try {
    const newSubmission = new Submission(req.body);
    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
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
