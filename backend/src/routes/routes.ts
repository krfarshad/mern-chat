import { Router } from "express";

const router: Router = Router();

// router.use(userRouter)
router.use((req, res) => {
  res.sendStatus(404).json({ message: "Route not found!" });
});

export default router;
