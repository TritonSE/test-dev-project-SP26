import Team from "../models/Team";

import type { Request, Response } from "express";

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().sort({ points: -1 });

    const teamsWithUrls = teams.map((team) => {
      return {
        ...team.toObject(),
        avatarUrl: "/eshaan-profile.jpg",
      };
    });

    res.status(200).json(teamsWithUrls);
  } catch (error: unknown) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};
