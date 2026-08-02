import type { NextFunction, Request, Response } from "express";
import Member from "../models/memberModel";

export const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

type AddMemberBody = {
  name: string;
  team: string;
  role: string;
  isPVP: boolean;
};

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found." });
    }
    res.status(200).json({ message: "Member deleted successfully." });
  } catch (error) {
    next(error);
  }
};
