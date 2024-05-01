import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { testRouteHandler, unknownRouteHandler } from "./routes/others.route";
import { ErrorMiddleware } from "./middlewares/Error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";

// INITIALIZING DOTENV FILE
require("dotenv").config();

// INITALIZING APP
export const app = express();

// BODY PARSER
app.use(express.json({ limit: "50mb" }));

// COOKIE PARSER
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// ROUTES
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);

// TESTING ROUTE
app.get("/test", testRouteHandler);

// UNKKNOWN ROUTES
app.all("*", unknownRouteHandler);

// ERROR HANDLING
app.use(ErrorMiddleware);
