import { Router } from "express";

const app = Router();

import { formatTokenData } from "../utils/auth";
import authenticateRequest from "../middlewares/auth";
import { authenticate, createNewUser, refreshTokens } from "../controllers/auth";
import { validateSignIn, validateSignUp, validateRefreshToken } from "../validators/user";

app.post("/login", validateSignIn, authenticate);

app.post("/signup", validateSignUp, createNewUser);

app.post("/refresh", validateRefreshToken, refreshTokens);

app.get("/checkTokenValidity", authenticateRequest, (req, res) => {
  res.json({ data: formatTokenData(req.user) });
});

export default app;
