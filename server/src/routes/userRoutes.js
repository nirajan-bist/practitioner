import { Router } from "express";

const app = Router();

import { authenticate, createNewUser, refreshTokens } from "../controllers/auth";

app.post("/signin", authenticate);

app.post("/signup", createNewUser);

app.post("/refresh", refreshTokens);

export default app;
