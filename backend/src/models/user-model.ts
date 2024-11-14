import mongoose from "mongoose";
import Counter from "../utils/counter";

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  displayName: mongoose.Schema.Types.String,
  bio: mongoose.Schema.Types.String,

  password: {
    type: mongoose.Schema.Types.String,
    require: [true, " password is require"],
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    validate: {
      validator: function (mail: string) {
        return /.+@.+\..+/.test(mail);
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["online", "offline", "busy", "away"],
    default: "offline",
  },
  lastSeen: Date,
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { model: "Chat" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      user.id = counter.count;
      next();
    } catch (error) {
      next(error as any);
    }
  } else {
    next();
  }
});

export const User = mongoose.model("User", userSchema);
