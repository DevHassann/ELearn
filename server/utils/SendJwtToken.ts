import { Response } from "express";
import { IUser } from "../interfaces/model.interfaces";
import { redis } from "../databases/redisDatabase";
import { accessTokenOptions, refreshTokenOptions } from "./Tokens";

// INITIALIZING DOTENV FILE
require("dotenv").config();

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // UPLOAD SESSION TO REDIS
  redis.set(user._id, JSON.stringify(user) as any);

  // ONLY SET SECURE TO TRUE IN PRODUCTION
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
