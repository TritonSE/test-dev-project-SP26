import express from "express";

import {
  createSubmission,
  deleteSubmission,
  getSubmissions,
  updateSubmission,
} from "../controllers/submissionControllers";
import { uploadSubmissionPhotos } from "../multer/uploadSubmissionPhotos";
import { validateSubmissionCreation } from "../validators/submissionValidators";

const router = express.Router();

router.get("/", getSubmissions);
router.post("/", uploadSubmissionPhotos, validateSubmissionCreation, createSubmission);
router.patch("/:id", updateSubmission);
router.delete("/:id", deleteSubmission);

export default router;
