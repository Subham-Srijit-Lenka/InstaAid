import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { createOrderController } from "../controllers/orderController.js";

const router = express.Router();

// CREATE ORDER
router.post("/create", requireSignIn, createOrderController);

export default router;
