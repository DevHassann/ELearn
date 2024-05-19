import express from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/Auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";

// INITIALIZATING ROUTER
const notificationRouter = express.Router();

// API PATHS
notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRole("admin"),
  getNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRole("admin"),
  updateNotification
);

export default notificationRouter;
