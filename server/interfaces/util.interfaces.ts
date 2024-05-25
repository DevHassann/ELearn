import { Document } from "mongoose";

// SEND MAIL INTERFACE
export interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

// ACTIVATION TOKEN INTERFACE
export interface IActivationToken {
  token: string;
  activationCode: string;
}

// TOKEN OPTIONS INTERFACE
export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// ANALYTICS GENERATOR INTERFACE
export interface MonthData {
  month: string;
  count: number;
}