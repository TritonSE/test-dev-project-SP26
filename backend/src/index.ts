import cors from "cors";
import "dotenv/config";
import express from "express";

import { frontend_origin } from "./config";
import configRouter from "./routes/configRoutes";
import membersRouter from "./routes/memberRoutes";
import rankingsRouter from "./routes/rankingRoutes";
import submissionsRouter from "./routes/submissionRoutes";
import teamsRouter from "./routes/teamRoutes";

import type { Request, Response } from "express";

const app = express();

app.use(
  cors({
    origin: frontend_origin,
  }),
);

app.use(express.json());

app.use("/api/members", membersRouter);
app.use("/api/rankings", rankingsRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/teams", teamsRouter);

app.use("/api/config", configRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

export default app;
