import jwt from "jsonwebtoken";

import * as User from "../modals/user";

import { getHashedPassword, compareHash, formatTokenResponse, getNewAccessToken } from "../utils/auth";

import { TOKEN_SECRETS, REFRESH_TOKEN } from "../constants";

/**
 * Sign in an existing user.
 * @param {Object} data email and password
 * @returns {Object} {user, tokens}
 */
export async function signIn(data) {
  const { email, password } = data;
  const user = await User.fetchByEmail(email);

  if (!user) {
    throw new Error("Invalid Email or Password!");
  }

  const { id, password: hashedPassword } = user;
  const pass = compareHash(password, hashedPassword);

  if (pass) {
    return formatTokenResponse(user);
  }

  throw new Error("Invalid Email or Password!");
}
/**
 * Creates new user user.
 * @param {Object} data email and password
 * @returns {Object} {user, tokens}
 */
export async function signUp(data) {
  const { email, password } = data;

  const hashedPassword = getHashedPassword(password);

  const user = await User.insert({ email, password: hashedPassword });

  return formatTokenResponse(user);
}
/**
 * Generates new access token and refresh token from existing refresh token.
 * @param {Object} data Refresh token
 * @returns {Object} {user, tokens}
 */
export async function generateNewAccessToken(data) {
  try {
    const { refreshToken } = data;

    const user = jwt.verify(refreshToken, TOKEN_SECRETS[REFRESH_TOKEN]);

    return getNewAccessToken(user);
  } catch (err) {
    throw new Error("Invalid Refresh Token");
  }
}
