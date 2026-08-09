import express from "express";

import { authVerify, debugConfig } from "../controllers/configControllers";

const router = express.Router();

router.post("/verify", authVerify);
router.get("/debug", debugConfig);

export default router;
