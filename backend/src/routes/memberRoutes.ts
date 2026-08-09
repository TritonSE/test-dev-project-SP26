import express from "express";

import { addMember, deleteMember, getMembers } from "../controllers/memberControllers";

const router = express.Router();

router.get("/", getMembers);
router.post("/", addMember);
router.delete("/:id", deleteMember);

export default router;
