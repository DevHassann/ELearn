// SEND MAIL INTERFACE
interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

// ACTIVATION TOKEN INTERFACE
interface IActivationToken {
  token: string;
  activationCode: string;
}

// TOKEN OPTIONS INTERFACE
interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export { EmailOptions, IActivationToken, ITokenOptions };
