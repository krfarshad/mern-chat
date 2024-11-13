import { Router } from "express";
import authRouter from "./auth/auth-route";
import chatRouter from "./chats/chat-route";

const router: Router = Router();

router.use(authRouter);
router.use(chatRouter);

router.use((req, res) => {
  res.sendStatus(404).json({ message: "Route not found!" });
});

export default router;
