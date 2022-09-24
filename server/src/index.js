import "./env";

// Imports
import express from "express";
import morgan from "morgan";

import createLogger, { writeStream } from "./utils/logger";
const logger = createLogger("index");

// Initialization
const app = express();
app.use(morgan("tiny", { stream: writeStream }));

const PORT = process.env.NODE_PORT;

app.get("/api", (req, res) => {
  res.send("Practitioner API");
});

// Listen to the port
app.listen(PORT, () => {
  logger(`Listening on port: ${PORT}`);
});