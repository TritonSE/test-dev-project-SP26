import express from "express";

import {
  createSubmission,
  deleteSubmission,
  getSubmissions,
  updateSubmission,
} from "../controllers/submissionControllers";

const router = express.Router();

router.get("/", getSubmissions);
router.post("/", createSubmission);
router.patch("/:id", updateSubmission);
router.delete("/:id", deleteSubmission);

export default router;
