import { Router } from "express";
import {
  getAllLists,
  addList,
  updateListName,
  deleteList,
} from "../controllers/listControllers.js";

const router = Router();

router.get("/", getAllLists);

router.post("/", addList);

router.put("/:id", updateListName);

router.delete("/:id", deleteList);

export default router;
