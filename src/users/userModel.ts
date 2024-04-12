import mongoose from "mongoose";
import { UserType } from "./userTypes";
const userShcema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserType>("User", userShcema);
