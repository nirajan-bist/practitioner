import "./env";

// Imports
import express from "express";

// Initialization
const app = express();

const PORT = process.env.NODE_PORT;

app.get("/api", (req, res) => {
  res.send("Practitioner API");
});

// Listen to the port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
