import mongoose from "mongoose";
import Counter from "../utils/counter";

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  type: {
    enum: ["action", "text"],
    default: "text",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.pre("save", async function (next) {
  const message = this;
  if (message.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { model: "Chat" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      message.id = counter.count;
      next();
    } catch (error) {
      next(error as any);
    }
  } else {
    next();
  }
});

export const Message = mongoose.model("Message", messageSchema);
