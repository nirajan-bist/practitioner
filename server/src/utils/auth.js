import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_SECRETS } from "../constants";
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
    accessToken: jwt.sign(data, TOKEN_SECRETS[ACCESS_TOKEN], { expiresIn: "1d" }),
    refreshToken: jwt.sign(data, TOKEN_SECRETS[REFRESH_TOKEN], { expiresIn: "7d" }),
  };
}
