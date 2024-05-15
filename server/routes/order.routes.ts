import express from "express";
import { isAuthenticated } from "../middlewares/Auth";
import { createOrder } from "../controllers/order.controller";

// INITIALIZATING ROUTER
const orderRouter = express.Router();

// API PATHS
orderRouter.post("/create-order", isAuthenticated, createOrder);

export default orderRouter;
