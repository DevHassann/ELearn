import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { testRouteHandler, unknownRouteHandler } from "./routes/other.routes";
import { ErrorMiddleware } from "./middlewares/Error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.routes";
import orderRouter from "./routes/order.routes";

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
app.use("/api/v1", userRouter, courseRouter, orderRouter);

// TESTING ROUTE
app.get("/test", testRouteHandler);

// UNKKNOWN ROUTES
app.all("*", unknownRouteHandler);

// ERROR HANDLING
app.use(ErrorMiddleware);
