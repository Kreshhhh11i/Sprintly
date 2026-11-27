import express from "express";
import AsyncHandler from "../utils/AsyncHandler.js"

import { registerUserController, verifyEmailController } from "../controllers/auth.controller.js";


const router = express.Router();
router.post("/register", AsyncHandler(registerUserController));
router.post("/email-verify", AsyncHandler(verifyEmailController));
export default router;