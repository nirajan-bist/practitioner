import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_SECRETS, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants";
/**
 * Returns salted hash from given plain-text password.
 * @param {String} rawPassword
 */
export function getHashedPassword(rawPassword) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(rawPassword, salt);

  return hash;
}
/**
 * Returns true if hashes match otherwise false.
 * @param {String} hashA
 * @param {String} hashB
 */
export function compareHash(hashA, hashB) {
  return bcrypt.compareSync(hashA, hashB);
}
/**
 * Generates access token and refresh token from given data.
 * @param {Object} data Claims for the token.
 */
export function getSignedTokens(data) {
  return {
    accessToken: jwt.sign(data, TOKEN_SECRETS[ACCESS_TOKEN], { expiresIn: ACCESS_TOKEN_EXPIRY }),
    refreshToken: jwt.sign(data, TOKEN_SECRETS[REFRESH_TOKEN], { expiresIn: REFRESH_TOKEN_EXPIRY }),
  };
}
/**
 * Formats the token payload
 * @param {Object} data Claims for the token.
 */
export function formatTokenData(data) {
  const { id, email } = data;
  // Extract only the claims from the data
  return {
    id,
    email,
  };
}
/**
 * Formats the token response
 * @param {Object} data Claims for the token.
 */
export function formatTokenResponse(data) {
  const user = formatTokenData(data);
  return {
    user,
    tokens: getSignedTokens(user),
  };
}

/**
 * Formats the token response
 * @param {Object} data Claims for the token.
 */
export function getNewAccessToken(data) {
  const user = formatTokenData(data);
  return jwt.sign(user, TOKEN_SECRETS[ACCESS_TOKEN], { expiresIn: ACCESS_TOKEN_EXPIRY });
}
