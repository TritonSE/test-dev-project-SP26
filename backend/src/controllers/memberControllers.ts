import type { Request, Response } from "express";
import Member from "../models/Member";
import { getPresignedImageUrl, uploadFileToS3 } from "../utils/s3";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await Member.find();

    const membersWithUrls = await Promise.all(
      members.map(async (member) => {
        let photoUrl = null;

        if (member.photoKey) {
          photoUrl = await getPresignedImageUrl(member.photoKey);
        }

        return {
          ...member.toObject(),
          photoUrl,
        };
      }),
    );

    res.status(200).json(membersWithUrls);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

type AddMemberBody = {
  name: string;
  team: string;
  role: string;
  isPVP: boolean;
};

export const addMember = async (req: Request, res: Response) => {
  const { name, team, role, isPVP } = req.body as AddMemberBody;

  if (!name || !team || !role || isPVP === undefined) {
    return res.status(400).json({ error: "One of the fields is missing." });
  }

  if (
    typeof name !== "string" ||
    typeof team !== "string" ||
    typeof role !== "string" ||
    typeof isPVP !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid data types for one or more fields." });
  }

  const newMember = new Member(req.body);
  const savedMember = await newMember.save();
  res.status(201).json(savedMember);
};

export const deleteMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedMember = await Member.findByIdAndDelete(id);
  if (!deletedMember) {
    return res.status(404).json({ error: "Member not found." });
  }
  res.status(200).json({ message: "Member deleted successfully." });
};

type AuthenticatedRequest = {
  file?: Express.Multer.File;
  user?: {
    id: string;
  };
} & Request;

export const uploadProfilePicture = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized user" });
      return;
    }

    const fileKey = await uploadFileToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

    const updatedUser = await Member.findByIdAndUpdate(
      userId,
      { photoKey: fileKey },
      { new: true },
    );

    const presignedUrl = await getPresignedImageUrl(fileKey);

    res.status(200).json({
      message: "Profile picture updated successfully!",
      user: updatedUser,
      photoUrl: presignedUrl,
    });
  } catch (error) {
    console.error("S3 Upload/DB Error:", error);
    res.status(500).json({ error: "Failed to upload profile picture" });
  }
};
