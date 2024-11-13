import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  name: {
    type: String,
    trim: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  avatar: {
    type: String,
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
