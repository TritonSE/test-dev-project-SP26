import Submission from "../models/Submission";

import type { Request, Response } from "express";

export const getSubmissions = async (_req: Request, res: Response) => {
  try {
    const submissions = await Submission.find().sort({ date: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
