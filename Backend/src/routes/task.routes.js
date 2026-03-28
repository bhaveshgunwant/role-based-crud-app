import express from "express";
import taskController from "../controllers/task.controllers.js"
import { protect } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/", protect, taskController.createTask);
router.get("/", protect, taskController.getTasks);
router.get("/:id", protect, taskController.getTaskById);
router.put("/:id", protect, taskController.updateTask);



export default router;