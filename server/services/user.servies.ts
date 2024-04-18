import { Response } from "express";
import userModel from "../models/user.model";

// GET USER BY ID
export const getUserByID = async (id: string, res: Response) => {
  const user = await userModel.findById(id);
  res.status(201).json({
    success: true,
    user,
  });
};
