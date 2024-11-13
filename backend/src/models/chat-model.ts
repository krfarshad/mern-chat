import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "chatType",
    required: true,
  },
  chatType: {
    type: String,
    enum: ["PrivateChat", "GroupChat"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  attachment: String,
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("Message", messageSchema);
