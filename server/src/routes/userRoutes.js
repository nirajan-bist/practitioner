import { Router } from "express";

const app = Router();

app.get("/", (req, res) => {
  res.send("Test");
});

export default app;
