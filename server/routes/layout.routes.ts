import { getLayoutByType } from "./../controllers/layout.controller";
import express from "express";
import { createLayout, editLayout } from "../controllers/layout.controller";
import { authorizeRole, isAuthenticated } from "../middlewares/Auth";

// INITIALIZATING ROUTER
const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRole("admin"),
  editLayout
);

layoutRouter.get("/get-layout", getLayoutByType);

export default layoutRouter;
