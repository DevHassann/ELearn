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

export { EmailOptions, IActivationToken };
