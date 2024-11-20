import { Router } from "express";
import { ChatController } from "../../controllers/chat-controller";
import { getUserByToken } from "../../middlewares/getUser-middleware";

const router: Router = Router();

// chat lists
router.get("/chats", [getUserByToken], ChatController.getChats);

// create chat
router.post("/chats", [getUserByToken], ChatController.createChat);

// chat show
router.get("/chats/:chatId", [getUserByToken], ChatController.getChat);

// chat messages
router.get(
  "/chats/:chatId/messages",
  [getUserByToken],
  ChatController.getMessages
);

// post message
router.post(
  "/chats/:chatId/messages",
  [getUserByToken],
  ChatController.postMessage
);

// invite to chat
router.post("/chats/:chatId/invite", [getUserByToken], ChatController.invite);

// accept and join to chat

// left chat
router.post("/chats/:chatId/leave", [getUserByToken], ChatController.leave);

export default router;
