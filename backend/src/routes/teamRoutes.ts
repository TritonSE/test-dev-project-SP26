import express from "express";

import { deleteTeam, getTeams, updateTeam } from "../controllers/teamControllers";

const router = express.Router();

router.get("/", getTeams);
router.patch("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
