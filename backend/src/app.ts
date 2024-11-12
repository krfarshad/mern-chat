import express from "express";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./utils/passport";
import "./database";
import dotenv from "dotenv";
import { config } from "./config/global.config";
import helmet from "helmet";
import cors from "cors";
// import { setCSRFTokenCookie } from "./middlewares/set-crf-middleware";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import { createServer } from "node:http";
import { Server } from "socket.io";
import logger from "./utils/logger";

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

// socket
const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("message", { Farshad: "hello " });
  socket.on("anther event", (data) => {
    console.log("data", data);
  });
});

app.use("/api/v1/", routes);
app.use(errorHandler);

const port = config.port || 5000;
app.listen(5000, () => {
  logger.info(`server is running in ${port}`);
});
