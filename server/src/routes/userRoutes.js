import { Router } from "express";
import { authenticate, createNewUser, logOut, refreshTokens } from "../controllers/auth";
import authenticateRequest from "../middlewares/auth";
import { validateSignIn, validateSignUp, validateRefreshToken } from "../validators/user";

const app = Router();

app.post("/login", validateSignIn, authenticate);

app.post("/signup", validateSignUp, createNewUser);

app.post("/refresh", validateRefreshToken, refreshTokens);

app.post("/logout", validateRefreshToken, logOut);

export default app;
