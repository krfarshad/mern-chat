import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const GroupChat = mongoose.model("GroupChat", groupChatSchema);
