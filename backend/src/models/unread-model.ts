import mongoose from "mongoose";

const UnreadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  unreadMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

export const UnreadMessage = mongoose.model("UnreadMessage", UnreadSchema);
