import { Router } from "express";
import listRoutes from "./listRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.use("/lists", listRoutes);

router.use("/task", taskRoutes);

export default router;
