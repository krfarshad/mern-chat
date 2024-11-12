import { configDotenv } from "dotenv";

configDotenv();

export const config = {
  env: process.env.MODE || "dev",
  port: process.env.PORT || "5005",
  jwt_secret: process.env.JWT_SECRET ?? "",
  csrf_secret: process.env.CSRF_SECRET ?? "",
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET ?? "",
  slack_url: process.env.SLACK_WEBHOOK_URL ?? "",
  mongo_url: process.env.MONGO_URL ?? "mongodb://localhost:27017/mern-chat",
};
