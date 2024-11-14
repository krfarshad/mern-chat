import mongoose from "mongoose";
import Counter from "../utils/counter";

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

chatSchema.pre("save", async function (next) {
  const chat = this;
  if (chat.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { model: "Chat" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      chat.id = counter.count;
      next();
    } catch (error) {
      next(error as any);
    }
  } else {
    next();
  }
});

export const Chat = mongoose.model("Chat", chatSchema);
