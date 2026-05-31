import express from "express";

import type { Request, Response } from "express";
import membersRoute from "./routes/members";

const app = express();
app.use("/api/members", membersRoute);
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TSE Social Points API is running!" });
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
