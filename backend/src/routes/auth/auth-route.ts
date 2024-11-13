import { Router } from "express";
import { checkSchema } from "express-validator";
import { AuthController } from "../../controllers/auth-controller";
import passport from "passport";
import { authRateLimiter } from "../../middlewares/rate-limit-middleware";
import { CSRFMiddleware } from "../../middlewares/csrf-middleware";
import { checkSchemaValidator } from "../../middlewares/checkSchema-middleware";
import { createUserValidationSchema } from "../../models/schemas/register-schema";
import { upload } from "../../middlewares/upload-middleware";

const router = Router();

router.post(
  "/auth/register",
  checkSchema(createUserValidationSchema),
  // [authRateLimiter, CSRFMiddleware, checkSchemaValidator],
  AuthController.register
);

router.post(
  "/auth/login",
  // [authRateLimiter, CSRFMiddleware],
  AuthController.login
);

router.post(
  "/auth/complete-profile",
  [upload.single("avatar")],
  AuthController.completeProfile
);

router.get("/auth/status", AuthController.status);

router.post("/auth/logout", AuthController.logout);

router.get("/auth/discord", passport.authenticate("discord"));

router.get("/auth/refresh-token", AuthController.refreshToken);

export default router;
