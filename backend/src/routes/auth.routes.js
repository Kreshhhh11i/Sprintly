import express from "express";
import AsyncHandler from "../utils/AsyncHandler.js"

import { registerUserController } from "../controllers/auth.controller.js";


const router = express.Router();
router.post("/register", AsyncHandler(registerUserController));
export default router;