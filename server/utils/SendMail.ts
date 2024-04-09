import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

// INITIALIZING DOTENV FILE
require("dotenv").config();

// EMAIL OPTIONS INTERFACE
interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

// SEND MAIL FUNCTION
const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  // GET THE PATH TO THE EMAIL TEMPLATE FILE
  const templatePath = path.join(__dirname, "../templates", template);

  // RENDER THE EMAIL TEMPLATE WITH EJS
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
