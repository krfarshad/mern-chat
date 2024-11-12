import mongoose from "mongoose";

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
});

export const User = mongoose.model("User", userSchema);
