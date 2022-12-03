/**
 * TOKEN CONSTANTS
 */
export const ACCESS_TOKEN = "access token";
export const REFRESH_TOKEN = "refresh token";

export const TOKEN_TYPES = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
};

export const TOKEN_SECRETS = {
  [ACCESS_TOKEN]: process.env.ACCESS_TOKEN_SECRET,
  [REFRESH_TOKEN]: process.env.REFRESH_TOKEN_SECRET,
};

export const ACCESS_TOKEN_EXPIRY = "20s";
export const REFRESH_TOKEN_EXPIRY = "7d";

//============================================================
/**
 * ERROR CONSTANTS
 */
export const AUTHENTICATION_ERROR = "Authentication Error";
export const INVALID_TOKEN = "Invalid Token Error";

export const ERROR_TYPES = {
  AUTHENTICATION_ERROR,
  INVALID_TOKEN,
};

export const ERROR_MESSAGES = {
  [AUTHENTICATION_ERROR]: AUTHENTICATION_ERROR,
  [INVALID_TOKEN]: INVALID_TOKEN,
};
