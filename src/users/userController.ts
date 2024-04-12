import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { UserType } from "./userTypes";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All feilds Are required");
    return next(error);
  }
  //Call Databse
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(
        400,
        "Already have a user with this email!"
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user."));
  }

  //password > hash
  const hashedPassword = await bcrypt.hash(password, 10);
  let newuser: UserType;
  try {
    newuser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user."));
  }

  //Token generation JWT
  try {
    const token = sign({ sub: newuser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    //response
    res.json({
      accessToken: token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while signing jwt token."));
  }
};

export { createUser };
