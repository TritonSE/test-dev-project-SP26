import Team from "../models/Team";

import type { Request, Response } from "express";

export const getTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};

type UpdateTeamBody = Partial<{
  teamName: string;
  points: number;
  avatarKey: string;
}>;

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body as UpdateTeamBody, {
      new: true,
      runValidators: true,
    });
    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found." });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found." });
    }
    res.status(200).json({ message: "Team deleted successfully." });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
};
