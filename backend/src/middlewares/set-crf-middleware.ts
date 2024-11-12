import { Request, Response, NextFunction } from "express";
import { config } from "../config/global.config";

export const setCSRFTokenCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.cookies["csrfToken"]) {
    const { csrf_secret, env } = config;
    res.cookie("csrfToken", csrf_secret.trim(), {
      httpOnly: env === "production" ? true : false,
      secure: env === "production",
    });
  } else {
    next();
  }
};
