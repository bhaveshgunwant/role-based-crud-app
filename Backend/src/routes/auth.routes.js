import express from "express";
import authController from "../controllers/auth.controllers.js";

const router = express.Router();

// `/api/auth/`
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

export default router;