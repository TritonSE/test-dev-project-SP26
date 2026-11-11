import Ranking from "../models/Rankings";
import { getPresignedImageUrl } from "../utils/s3";

import type { Request, Response } from "express";

export const getRankings = async (_req: Request, res: Response) => {
  try {
    const rankings = await Ranking.find();

    const rankingsWithUrls = await Promise.all(
      rankings.map(async (ranking) => ({
        ...ranking.toObject(),
        photoUrls: await Promise.all(
          ranking.photoKeys.map(async (key) => getPresignedImageUrl(key)),
        ),
      })),
    );

    res.status(200).json(rankingsWithUrls);
  } catch (error) {
    console.error("Error fetching rankings:", error);
    res.status(500).json({ error: "Failed to fetch rankings" });
  }
};

export const deleteRanking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRanking = await Ranking.findByIdAndDelete(id);
    if (!deletedRanking) {
      return res.status(404).json({ error: "Ranking not found." });
    }
    res.status(200).json({ message: "Ranking deleted successfully." });
  } catch (error) {
    console.error("Error deleting ranking:", error);
    res.status(500).json({ error: "Failed to delete ranking" });
  }
};
