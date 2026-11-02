import express from "express";

import { getTeams } from "../controllers/teamControllers";

const router = express.Router();

router.get("/", getTeams);

export default router;
