import cors from "cors";
import "dotenv/config";
import express from "express";

import type { Request, Response } from "express";
import { frontend_origin } from "./config";
import configRouter from "./routes/configRoutes";
import membersRouter from "./routes/memberRoutes";

const app = express();

app.use(
  cors({
    origin: frontend_origin,
  }),
);

app.use(express.json());

app.use("/api/members", membersRouter);

app.use("/api/config", configRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

export default app;
