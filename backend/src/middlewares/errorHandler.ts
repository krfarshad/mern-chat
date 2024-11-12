import { NextFunction, Response, Request } from "express";
import logger from "../utils/logger";
import { ApiError } from "../utils/ApiError";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.status ? res.status : 500;
  console.log(err);
  if (err instanceof ApiError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.data,
    });
  } else {
    res.status(500).json({
      message: "An unexpected error occurred",
    });
  }

  if (statusCode == 500) {
    logger.error(err);
  }

  next();
};
