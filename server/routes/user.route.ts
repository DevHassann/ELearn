import express from "express";
import { activateUser, registrationUser } from "../controllers/user.controller";

// INITIALIZATING ROUTER
const userRouter = express.Router();

// API PATHS
userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);

export default userRouter;
