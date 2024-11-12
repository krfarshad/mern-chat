import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const CSRFMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const csrfTokenFromCookie = req.cookies["csrfToken"];
  const csrfTokenFromHeader = req.headers["x-csrf-token"];
  if (!csrfTokenFromCookie || !csrfTokenFromHeader) {
    res.status(403).json(new ApiError(403, "CSRF token missing"));
  }

  if (csrfTokenFromCookie != csrfTokenFromHeader) {
    res.status(403).json(new ApiError(403, "Invalid CSRF token"));
  } else {
    next();
  }
};
