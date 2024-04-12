import express, { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorhandler from "./middlewares/globalErrorhandler";
const app = express();

//Routes
app.get("/", (req, res, next) => {
  const error = createHttpError(400, "Something Went Wrong!");
  throw error;
  res.json({
    text: "sometext for now",
  });
});

app.use(globalErrorhandler);

export default app;
