import express from "express";
import multer from "multer";

import {
  addMember,
  deleteMember,
  getMembers,
  uploadProfilePicture,
} from "../controllers/memberControllers";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getMembers);

router.post("/upload-profile-picture", upload.single("image"), uploadProfilePicture);
router.post("/", addMember);

router.delete("/:id", deleteMember);

export default router;
