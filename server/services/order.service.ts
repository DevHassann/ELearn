import { NextFunction, Response } from "express";
import { CatchAsyncErrors } from "../middlewares/CatchAsyncErrors";
import OrderModel from "../models/order.model";

// CREATE NEW ORDER
export const newOrder = CatchAsyncErrors(
  async (data: any, next: NextFunction, res: Response) => {
    const order = await OrderModel.create(data);

    res.status(201).json({
      success: true,
      order,
    });
  }
);
