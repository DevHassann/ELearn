import { Response } from "express";
import { redis } from "../databases/redisDatabase";
import UserModel from "../models/user.model";

// GET USER BY ID FUNCTION
export const getUserByIDService = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// GET ALL USERS FUNCTION
export const getAllUserService = async (res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// UPDATE USER ROLE FUNCTION
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const users = await UserModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    users,
  });
};
