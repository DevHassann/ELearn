import express from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/Auth";
import { createOrder, getOrders } from "../controllers/order.controller";

// INITIALIZATING ROUTER
const orderRouter = express.Router();

// API PATHS
orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get(
  "/get-orders",
  isAuthenticated,
  authorizeRole("admin"),
  getOrders
);

export default orderRouter;
