import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All feilds Are required");
    return next(error);
  }
  //Process
  //response

  res.json({
    message: "User registered!",
  });
};

export { createUser };