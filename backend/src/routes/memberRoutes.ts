import express from "express";

import { addMember, deleteMember, getMembers } from "../controllers/memberControllers";

const router = express.Router();

/*
router.get("/", (req, res) => {
  res.json(members);
  console.log("getting members");
});
*/

router.get("/", getMembers);
router.post("/", addMember);
router.delete("/:id", deleteMember);

export default router;
