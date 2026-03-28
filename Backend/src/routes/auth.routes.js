import express from "express";
import authController from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", authController.registerUser);

export default router;