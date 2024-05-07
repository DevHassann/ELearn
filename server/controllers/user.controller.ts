import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import ejs from "ejs";
import path from "path";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncErrors } from "../middlewares/CatchAsyncErrors";
import { createActivationToken } from "../utils/ActivationToken";
import sendMail from "../utils/SendMail";
import {
  IRegistrationBody,
  IActivationRequest,
  ILoginRequest,
  ISocialAuthBody,
  IUpdateUserInfo,
  IUpdatePassword,
} from "../interfaces/api.interfaces";
import { IUser } from "../interfaces/model.interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendToken } from "../utils/SendJwtToken";
import { redis } from "../databases/redisDatabase";
import { accessTokenOptions, refreshTokenOptions } from "../utils/Tokens";
import { getUserByID } from "../services/user.service";
import {
  EmptyCredentialsMessage,
  EmptyPassowrdMessage,
  ExistedEmailMessage,
  ExistedUserMessage,
  InvalidActivationCodeMessage,
  InvalidCredentialsMessage,
  InvalidOldPasswordMessage,
  InvalidUserMessage,
  RefreshTokenFailedMessage,
} from "../messages/api.messages";
import cloudinary from "cloudinary";

// INITIALIZING DOTENV FILE
require("dotenv").config();

// REGISTER USER FUNCTION
export const registrationUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler(ExistedEmailMessage, 404));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../templates/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// ACTIVATE USER FUNCTION
export const activateUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler(InvalidActivationCodeMessage, 404));
      }

      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(new ErrorHandler(ExistedUserMessage, 404));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// LOGIN USER FUNCTION
export const loginUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler(EmptyCredentialsMessage, 404));
      }

      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler(InvalidCredentialsMessage, 404));
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler(InvalidCredentialsMessage, 404));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// LOGOUT USER FUNCTION
export const logoutUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const userId = req.user?._id || "";
      redis.del(userId);

      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// UPDATE ACCESS TOKEN FUNCTION
export const updateAccessToken = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(new ErrorHandler(RefreshTokenFailedMessage, 404));
      }

      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(new ErrorHandler(RefreshTokenFailedMessage, 404));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// GET USER INFORMATION FUNCTION
export const getUserInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      getUserByID(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// SOCIAL AUTHENTICATION FUNCTION
export const socialAuth = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;

      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// UPDATE USER INFORMATION FUNCTION
export const updateUserInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (email && user) {
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
          return next(new ErrorHandler(ExistedEmailMessage, 404));
        }
        user.email = email;
      }
      if (name && user) {
        user.name = name;
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// UPDATE USER PASSWORD FUNCTION
export const updatePassword = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;
      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler(EmptyPassowrdMessage, 404));
      }

      const user = await userModel.findById(req.user?._id).select("+password");
      if (user?.password === undefined) {
        return next(new ErrorHandler(InvalidUserMessage, 404));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler(InvalidOldPasswordMessage, 404));
      }

      user.password = newPassword;
      await user.save();
      await redis.set(req.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// UPDATE PROFILE PICTURE FUNCION
export const updateProfilePicture = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (avatar && user) {
        if (user?.avatar?.public_id) {
          // DELETE THE OLD IMAGE
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
          // UPDATE IT WITH NEW IMAGE
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "Elearn Avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          // IF NO IMAGE SIMPLY JUST PUT THE IMAGE
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "Elearn Avatars",
            width: 150,
          });
          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
