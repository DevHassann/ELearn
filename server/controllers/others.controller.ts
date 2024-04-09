import { NextFunction, Request, Response } from "express";

// TESTING ROUTE FUNTION
const testRouteHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Successful test.",
  });
};

// UNKNOWN ROUTE FUNTION
const unknownRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new Error(`Route ${req.originalUrl} not found.`) as any;
  err.statusCode = 404;
  next(err);
};

export { testRouteHandler, unknownRouteHandler };
