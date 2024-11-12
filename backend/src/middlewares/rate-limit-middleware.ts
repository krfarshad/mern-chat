import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  message: "Too many attempts from this IP, please try again after 10 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
