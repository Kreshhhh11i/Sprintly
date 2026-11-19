import express from "express";
import devUser from "../middleware/DevUser.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { createProjectController } from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/", devUser, asyncHandler(createProjectController));

export default router;