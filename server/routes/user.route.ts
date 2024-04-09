import express from "express";
import { registrationUser } from "../controllers/user.controller";

// INITIALIZATING ROUTER
const userRouter = express.Router();

// API PATHS
userRouter.post("/registration", registrationUser);

export default userRouter;
