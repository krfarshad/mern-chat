import { Router } from "express";
import { ChatController } from "../../controllers/chat-controller";

const router: Router = Router();

router.get("/chats", ChatController.getChats);

router.post("/chats", ChatController.postMessage);

router.get("/chats/:chatId", ChatController.getChat);

export default router;
