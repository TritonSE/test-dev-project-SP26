import express from "express";

import { deleteRanking, getRankings } from "../controllers/rankingControllers";

const router = express.Router();

router.get("/", getRankings);
router.delete("/:id", deleteRanking);

export default router;
