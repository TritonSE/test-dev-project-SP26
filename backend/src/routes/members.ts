import express from "express";

import { members } from "../data/members";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(members);
});

export default router;
