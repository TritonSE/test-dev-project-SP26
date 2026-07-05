import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import type { Request, Response } from "express";

import { Config } from "./models/Config";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

void mongoose
  .connect(process.env.MONGODB_URI ?? "")
  .then(() => {
    console.info("Connected to MongoDB");
  })
  .catch((err: unknown) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

app.post("/auth/verify", async (req: Request, res: Response) => {
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
});

app.get("/debug-config", async (_req: Request, res: Response) => {
  const all = await Config.find({}).lean();
  res.json(all);
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
