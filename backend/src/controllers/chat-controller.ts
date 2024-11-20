import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { Chat } from "../models/chat-model";
import { ApiSuccess } from "../utils/ApiSuccess";
import { Message } from "../models/message-model";
import { io } from "../config/socket";
import { User } from "../models/user-model";

class ChatHandler {
  public getChats = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 20 } = req.query;
    try {
      const userId = req.user;
      const chats = await Chat.find({
        participants: { $in: [userId] },
      })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .populate("admin", "username  avatar id")
        .populate("lastMessage", "text createdAt")
        .populate("participants", "id username  avatar")
        .lean();

      const total = await Chat.countDocuments();

      const filterData = chats.map((chat) => {
        return {
          ...chat,
          participants: chat.participants.filter(
            (participant) => String(participant._id) !== String(userId)
          ),
        };
      });
      res.json(
        new ApiSuccess(200, filterData, "Successful", {
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
    const { text } = req.body;

    const userId = req.user;
    const chat = await Chat.findOne({ id: Number(chatId) });

    if (!chat) return res.status(404).json({ message: "Chat not found" });
    try {
      const message = await Message.create({
        chat: chat._id,
        sender: userId,
        text,
      });

      await Chat.findByIdAndUpdate(chat?._id, { lastMessage: message._id });

      io.to(chatId).emit("newMessage", message);

      const data = {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
      };
      res.status(201).json(new ApiSuccess(201, data, "successful posted"));
    } catch (error) {
      res.status(500).json({ message: "Error creating chat" });
    }
  });

  //   get chat
  public getMessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    try {
      const chat = await Chat.findOne({ id: Number(chatId) });

      if (!chat) return res.status(404).json({ message: "Chat not found" });

      const messages = await Message.find({ chat: chat._id })
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .select("-_id -__v")
        .populate({
          path: "chat",
          select: "id -_id",
        })
        .populate({
          path: "sender",
          select: "id username avatar -_id",
        });

      const total = await Message.countDocuments({ chat: chat._id });

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

  public getChat = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const userId = req.user;
    try {
      const chat = await Chat.findOne({ id: chatId })
        .populate("admin", "username  avatar id")
        .populate("lastMessage", "text createdAt")
        .populate("participants", "id username  avatar")
        .lean();
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      const existingParticipantIds = chat?.participants?.filter(
        (p) => p._id.toString() != userId
      );
      const result = {
        ...chat,
        participants: existingParticipantIds,
      };

      return res.status(200).json(new ApiSuccess(200, result, "Success"));
    } catch (error) {
      return res.status(500).json({ message: "Error fetching chat" });
    }
  });

  public createChat = asyncHandler(async (req: Request, res: Response) => {
    const { name, type, avatar, participants } = req.body;
    const userId = req.user;
    let data: any = {
      type,
      avatar,
    };
    if (type === "group") {
      Object.assign(data, { name, admin: userId, avatar: req.file?.filename });
    }

    const users = await User.find({ username: { $in: participants } });
    const userIds = users.map((user) => user._id);

    data.participants = [userId, ...userIds];

    try {
      const newChat = await Chat.create(data);
      let resultData: any = {
        id: newChat.id,
        type: newChat.type,
      };
      if (resultData.type === "group") {
        Object.assign(resultData, {
          name: newChat.name,
          admin: newChat.admin,
          avatar: newChat.avatar,
        });
      }

      res.json(new ApiSuccess(201, resultData, "Successful"));
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages" });
    }
  });

  public invite = asyncHandler(async (req: Request, res: Response) => {
    const { participants } = req.body; // Participants by username
    const { chatId } = req.params;
    const userId = req.user;

    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      if (chat?.admin?._id.toString() !== userId?.toString()) {
        return res.status(403).json({ message: "You have no access" });
      }

      // Fetch user IDs based on usernames
      const users = await User.find({ username: { $in: participants } });
      const userIds = users.map((user) => user._id);

      // Filter to include only new participants
      const existingParticipantIds = chat.participants.map((p) => p.toString());
      const newParticipantsToAdd = userIds.filter(
        (userId) => !existingParticipantIds.includes(userId.toString())
      );

      if (newParticipantsToAdd.length > 0) {
        chat.participants.push(...newParticipantsToAdd);
        await chat.save();

        const joinMessage = {
          chatId,
          message: "New participants have joined the chat",
          newParticipants: newParticipantsToAdd.map((id) =>
            users.find((user) => user._id.toString() === id.toString())
          ),
        };
        io.to(chatId).emit("join", joinMessage);

        newParticipantsToAdd.forEach(async (id) => {
          const welcomeMessage = {
            chatId,
            message: "You have been added to the chat",
          };
          io.to(id.toString()).emit("newChat", welcomeMessage);
        });

        res.json(
          new ApiSuccess(
            201,
            {
              id: chat._id,
            },
            "Participants successfully invited"
          )
        );
      } else {
        res.json(new ApiSuccess(200, {}, "No new participants to add"));
      }
    } catch (error) {
      res.status(500).json({ message: "Error adding participants to chat" });
    }
  });

  public leave = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user;
    const { chatId } = req.params;

    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      if (chat.type === "private") {
        return res
          .status(401)
          .json({ message: "Leaving is only acceptable for groups" });
      }

      if (userId === chat?.admin?._id.toString()) {
        return res
          .status(403)
          .json({ message: "As admin, you cannot leave the group" });
      }

      const participantIndex = chat.participants.findIndex(
        (p) => p.toString() === userId?.toString()
      );
      if (participantIndex === -1) {
        return res.status(404).json({ message: "User is not a participant" });
      }

      // Remove the user from participants
      chat.participants.splice(participantIndex, 1);
      await chat.save();

      const leaveMessage = {
        chatId,
        message: "A participant has left the group",
        userId,
      };

      io.to(chatId).emit("leave", leaveMessage);

      // Return a success response
      res.json(new ApiSuccess(200, { chatId }, "Successfully left the group"));
    } catch (error) {
      res.status(500).json({ message: "Error leaving the group" });
    }
  });

  public members = asyncHandler(async (req: Request, res: Response) => {
    const chatId = req.params;

    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      const existingParticipantIds = chat.participants.map((p) => p.toString());
      const users = await User.find(existingParticipantIds);

      res.json(new ApiSuccess(200, users, "successful"));
    } catch (error) {
      res.status(500).json({ message: "Error adding participants to chat" });
    }
  });
}

export const ChatController = new ChatHandler();
