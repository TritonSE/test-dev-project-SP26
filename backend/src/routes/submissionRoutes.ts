import express from "express";

import { getSubmissions } from "../controllers/submissionControllers";

const router = express.Router();

router.get("/", getSubmissions);

export default router;
