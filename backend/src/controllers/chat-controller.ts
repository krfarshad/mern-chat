import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { Chat } from "../models/chat-model";
import { ApiSuccess } from "../utils/ApiSuccess";
import { Message } from "../models/message-model";
import { io } from "../config/socket";

class ChatHandler {
  public getChats = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;

    try {
      const chats = await Chat.find({
        participants: "673452a8651f6ceb1dc81a49",
      })
        .sort({ updatedAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Chat.countDocuments();

      res.json(
        new ApiSuccess(200, chats, "Successful", {
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
        })
      );
    } catch (error) {
      res.status(500).json({ message: "Error fetching chats" });
    }
  });
  // post a message
  public postMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { senderId, text } = req.body;

    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
    } else {
      chat = await Chat.create({
        participants: [senderId],
        messages: [],
      });
    }

    const message = await Message.create({
      chat: chat?._id,
      sender: senderId,
      text,
    });

    try {
      await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

      io.to(chatId).emit("newMessage", message);

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error creating chat" });
    }
  });
  //   get chat
  public getChat = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    try {
      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ message: "Chat not found" });

      const messages = await Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Message.countDocuments({ chat: chatId });
      res.json(
        new ApiSuccess(200, messages, "Successful", {
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
        })
      );
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages" });
    }
  });
}

export const ChatController = new ChatHandler();
