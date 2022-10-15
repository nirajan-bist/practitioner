import "./env";

// Imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { authenticateRequest } from "./middlewares/auth";

import createLogger, { writeStream } from "./utils/logger";
const logger = createLogger("index");

// Initialization
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny", { stream: writeStream }));

const PORT = process.env.NODE_PORT;

app.get("/api", (req, res) => {
  res.send("Practitioner API");
});

app.use("/", routes.userRoutes);
app.use("/practitioner", authenticateRequest, routes.practitionerRoutes);

//Error handler
app.use((err, req, res, next) => {
  //Postgres unique constriant error
  if (err.code === "23505") {
    return res.status(400).send("User with this email exists already!");
  }

  //Server Error
  logger.error(err.stack);
  res.status(500).send({ message: "Server Error Occured!", stack: err.stack });
});

// Listen to the port
app.listen(PORT, () => {
  logger(`Listening on port: ${PORT}`);
});

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
