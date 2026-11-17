import express from "express";
import multer from "multer";

import {
  createSubmission,
  deleteSubmission,
  getSubmissions,
  updateSubmission,
} from "../controllers/submissionControllers";

const router = express.Router();

const uploadPhotos = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 24 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      callback(new Error("Only image files are allowed."));
      return;
    }
    callback(null, true);
  },
}).array("photos", 24);

router.get("/", getSubmissions);
router.post(
  "/",
  (req, res, next) => {
    uploadPhotos(req, res, (error) => {
      if (error) {
        const message =
          error instanceof multer.MulterError
            ? error.message
            : "Only image files up to 10 MB are allowed.";
        res.status(400).json({ error: message });
        return;
      }
      next();
    });
  },
  createSubmission,
);
router.patch("/:id", updateSubmission);
router.delete("/:id", deleteSubmission);

export default router;
