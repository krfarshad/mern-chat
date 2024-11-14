import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/global.config";

export const getUserByToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is required" });
  } else {
    const decoded: any = jwt.verify(token, config.jwt_secret);
    const { id } = decoded;
    req.user = id;
    next();
  }
};
