import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/global.config";

// Explicitly typing as RequestHandler
export const getUserByToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token is required" });
  } else {
    try {
      const decoded = jwt.verify(token, config.jwt_secret) as { id: string };
      req.user = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};
