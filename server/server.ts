import { app } from "./app";
import connectDB from "./databases/mongoDatabase";
import { v2 as cloudinary } from "cloudinary";

// INITIALIZING DOTENV FILE
require("dotenv").config();

// CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// CREATE SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server is connected with port: ${process.env.PORT}`);
  connectDB();
});
