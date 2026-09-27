import type { Request, Response } from "express";
import { Config } from "../models/Config";

export const authVerify = async (req: Request, res: Response) => {
  const { code } = req.body as { code: string };
  const config = await Config.findOne({ key: "AUTH_CODE" });
  const correctCode = config?.value;

  if (!correctCode) {
    res.status(500).json({ success: false, message: "Server misconfigured" });
    return;
  }

  if (code === correctCode) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect code, try again" });
  }
};

export const debugConfig = async (_req: Request, res: Response) => {
  const all = await Config.find({}).lean();
  res.json(all);
};
