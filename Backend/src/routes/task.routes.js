import express from "express";
import taskController from "../controllers/task.controllers.js"
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/", protect, taskController.createTask);



export default router;