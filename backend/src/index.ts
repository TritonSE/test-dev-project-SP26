/* eslint-disable perfectionist/sort-imports */

import cors from "cors";
import express from "express";

import type { Request, Response } from "express";
import membersRoute from "./routes/memberRoutes";
import { frontend_origin } from "./config";

const app = express();

app.use(
  cors({
    origin: frontend_origin,
  }),
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});

app.use("/api/members", membersRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

export default app;
