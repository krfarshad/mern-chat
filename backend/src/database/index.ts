import mongoose from "mongoose";
import logger from "../utils/logger";
import { config } from "../config/global.config";

const mongoURL = config.mongo_url;
mongoose
  .connect(mongoURL)
  .then(() => logger.info("Connected to Database"))
  .catch((err) => logger.error(`Error: ${err}`));
