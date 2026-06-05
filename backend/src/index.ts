import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import type { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

const memberSchema = new mongoose.Schema({
  name: String,
  team: String,
  role: String,
  isPVP: Boolean,
});

const Member = mongoose.model("Member", memberSchema);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.info("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

app.get("/members", async (_req: Request, res: Response) => {
  try {
    const members = await Member.find({}, { __v: 0 }).lean();
    res.json(members);
  } catch {
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
