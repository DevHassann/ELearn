import { Request } from "express";
import { IUser } from "../interfaces/model.interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
