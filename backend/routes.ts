import { Router } from "express";
import authRouter from "./auth/auth-route";

const router: Router = Router();

router.use(authRouter);
router.use((req, res) => {
  res.sendStatus(404).json({ message: "Route not found!" });
});

export default router;
