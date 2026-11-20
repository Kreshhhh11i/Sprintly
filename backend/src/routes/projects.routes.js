import express from "express";
import devUser from "../middleware/DevUser.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { createProjectController, deleteProjectController, getProjectByIdController, listProjectsController, updateProjectController } from "../controllers/projects.controller.js";

const router = express.Router();

router.post("/", devUser, asyncHandler(createProjectController));
router.get("/", devUser, asyncHandler(listProjectsController));
router.get("/:id", devUser, asyncHandler(getProjectByIdController));
router.patch("/:id", devUser,asyncHandler(updateProjectController));
router.delete("/:id", devUser, asyncHandler(deleteProjectController));
export default router;