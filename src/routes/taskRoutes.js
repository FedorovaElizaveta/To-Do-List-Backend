import { Router } from "express";
import {
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", addTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
