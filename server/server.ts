import { app } from "./app";
import connectDB from "./databases/mongoDatabase";

// INITIALIZING DOTENV FILE
require("dotenv").config();

// CREATE SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server is connected with port: ${process.env.PORT}`);
  connectDB();
});
