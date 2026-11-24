import express from "express";

import {
  addMember,
  deleteMember,
  getMembers,
  updateMember,
  uploadProfilePicture,
} from "../controllers/memberControllers";
import { uploadMemberImage } from "../multer/uploadMemberImage";

const router = express.Router();

router.get("/", getMembers);

router.post("/:id/upload-profile-picture", uploadMemberImage, uploadProfilePicture);
router.post("/", addMember);

router.patch("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
