import { Response } from "express";
import { redis } from "../databases/redisDatabase";

// GET USER BY ID
export const getUserByID = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};
