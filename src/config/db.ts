import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected Succesfully");
    });

    mongoose.connection.on("error", () => {
      console.error("Error In Connecting to database");
    });
    await mongoose.connect(config.dbString as string);
  } catch (err) {
    console.error("Failed ToConnect With Databae", err);
    process.exit(1);
  }
};

export default connectDB;
