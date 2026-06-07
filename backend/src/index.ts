/* eslint-disable perfectionist/sort-imports */

import cors from "cors";
import express from "express";

import type { Request, Response } from "express";
import membersRoute from "./routes/members";

const app = express();

app.use(
  cors({
    origin: ["http://localhost", "http://localhost:3000"],
  }),
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});

app.use("/api/members", membersRoute);

const PORT = process.env.PORT ?? 3001;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
