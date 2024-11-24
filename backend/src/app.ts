import express from "express";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./utils/passport";
import "./config/database";
import dotenv from "dotenv";
import { config } from "./config/global.config";
import helmet from "helmet";
import cors from "cors";
// import { setCSRFTokenCookie } from "./middlewares/set-crf-middleware";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./utils/logger";
import { Socket } from "socket.io";
import { UnreadMessage } from "./models/unread-model";
import { User } from "./models/user-model";
const socket = require("socket.io");

const session = require("express-session");

const app: express.Application = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser("secret"));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use(setCSRFTokenCookie);

app.use(
  session({
    secret: "default session",
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

app.use("/api/v1/", routes);
app.use(errorHandler);

const port = config.port || 5000;
const server = app.listen(5000, () => {
  logger.info(`server is running in ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("add-user", (userId) => {
    socket.data.userId = userId;
    socket.join(userId);
  });

  socket.on("markAsRead", async ({ username, chatId, messageIds }) => {
    try {
      const user = await User.findOne({ username });
      await UnreadMessage.findOneAndUpdate(
        { userId: user?._id, chatId },
        { $pull: { unreadMessages: { $lte: messageIds } } }
      );
    } catch (error) {
      logger.error(
        "error",
        console.error("Error marking messages as read:", error)
      );
    }
  });

  socket.on("newChat", (newChat) => {
    io.to(newChat.roomId).emit("newChat", newChat);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
  });
});

app.set("socketio", io);
