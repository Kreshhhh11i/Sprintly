import express from "express";
import devUser from "../middleware/DevUser.js";
import asyncHandler from "../utils/AsyncHandler.js";

import {
  createTaskController,
  getTaskbyIdController,
  listTasksByProjectController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", devUser, asyncHandler(createTaskController));

router.get("/", devUser, asyncHandler(listTasksByProjectController));

router.get("/:taskId", devUser, asyncHandler(getTaskbyIdController));

router.patch("/:taskId", devUser, asyncHandler(updateTaskController));

router.delete("/:taskId", devUser, asyncHandler(deleteTaskController));

export default router;