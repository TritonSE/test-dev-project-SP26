import cors from "cors";
import "dotenv/config";
import express from "express";

import type { Request, Response } from "express";
import { frontend_origin } from "./config";
import configRoute from "./routes/configRoutes";
import membersRoute from "./routes/memberRoutes";

const app = express();

app.use(
  cors({
    origin: frontend_origin,
  }),
);

app.use(express.json());

app.use("/api/members", membersRoute);

app.use("/api/config", configRoute);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

export default app;
