import express from "express";
import { config } from "dotenv";
import logger, { expressLogger, expressLoggerDev } from "./utils/logger";
import cors from "cors";
import helmet from "helmet";
import configLoader from "config";
import { cleanEnv, num, url, json, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: num(),
  HASURA_URL: url(),
  HASURA_ADMIN_SECRET: str({
    desc: "Hasura admin secret",
  }),
  EMAIL_CONFIG_JSON: json({ desc: "Additional email parameters" }),
  RAZORPAY_KEY: str({
    desc: "Razorpay key",
  }),
  RAZORPAY_HMAC_SECRET: str({
    desc: "Razorpay webhook hmac secret",
  }),
  API_KEY: str({
    desc: "hasura webhook api key",
  }),
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
if (process.env.NODE_ENV !== "production") {
  app.use(expressLoggerDev);
} else {
  app.use(expressLogger);
}

app.get("/ping", (req, res) =>
  res.json({
    message: "Hello World!",
  })
);

app.listen(configLoader.get("port"), () => {
  logger.info(`Server is running on port ${configLoader.get("port")}`);
});
