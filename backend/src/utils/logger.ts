import winston, { format, transports } from "winston";
import { config } from "../config/global.config";
import SlackHook from "winston-slack-webhook-transport";

const isDev = config.env === "dev";
const { printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${level.toUpperCase()} : ${message} - ${timestamp}`;
});

const logger = winston.createLogger({
  level: isDev ? "debug" : "info",

  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: isDev ? true : false }),
    customFormat
  ),
  defaultMeta: { service: "user-service" },
  transports: [],
});

if (isDev) {
  logger.add(
    new transports.Console({
      level: "info",
    })
  );
  logger.add(
    new SlackHook({
      webhookUrl: config.slack_url,
      level: "info",
    })
  );
  logger.add(
    new winston.transports.File({
      filename: "src/utils/logs/error.log",
      level: "info",
    })
  );
}

export default logger;
