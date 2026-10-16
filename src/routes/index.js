import { Router } from "express";
import listRoutes from "./listRoutes.js";

const router = Router();

router.use("/lists", listRoutes);

export default router;
