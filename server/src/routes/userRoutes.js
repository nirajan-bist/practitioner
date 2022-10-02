import { Router } from "express";

const app = Router();

import { authenticate, createNewUser, refreshTokens } from "../controllers/auth";

import { validateSignIn, validateSignUp, validateRefreshToken } from "../validators/user";

app.post("/signin", validateSignIn, authenticate);

app.post("/signup", validateSignUp, createNewUser);

app.post("/refresh", validateRefreshToken, refreshTokens);

export default app;
