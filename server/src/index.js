import "./env";

// Imports
import express from "express";
import morgan from "morgan";
import routes from "./routes";

import createLogger, { writeStream } from "./utils/logger";
const logger = createLogger("index");

// Initialization
const app = express();
app.use(morgan("tiny", { stream: writeStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.NODE_PORT;

app.get("/api", (req, res) => {
  res.send("Practitioner API");
});

app.use("/", routes.userRoutes);
app.use("/practitioner", routes.practitionerRoutes);

//Error handler
app.use((err, req, res, next) => {
  //Postgres unique constriant error
  if (err.code === "23505") {
    return res.status(400).send("User with this email exists already!");
  }

  //Server Error
  res.status(500).send({ msg: "Server Error Occured!", stack: err.stack });
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
