import cors from "cors";
import "dotenv/config";
import express from "express";

import type { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

app.post("/auth/verify", (req: Request, res: Response) => {
  const { code } = req.body as { code: string };
  const correctCode = process.env.AUTH_CODE ?? "TSE2026";

  if (code === correctCode) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Incorrect code, try again" });
  }
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});

process.stdin.resume();
