import "./env";

// Imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { authenticateRequest } from "./middlewares/auth";
import errorHandler from "./middlewares/errorHandler";

import createLogger, { writeStream } from "./utils/logger";
const logger = createLogger("index");

// Initialization
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny", { stream: writeStream }));

app.get("/api", (req, res) => {
  res.send("Practitioner API");
});

app.use("/", routes.userRoutes);
app.use("/practitioner", authenticateRequest, routes.practitionerRoutes);
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Not Found",
  });
});

//Error handler middleware
app.use(errorHandler);

// Catch unhandled rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled rejection");
  logger.error(err.stack);

  process.exit(1);
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught exception");
  logger.error(err.stack);

  process.exit(1);
});

export default app;
