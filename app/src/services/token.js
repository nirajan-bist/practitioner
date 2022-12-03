import cookies from "utils/cookies";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants";
import jwt_decode from "jwt-decode";

export function saveTokens({ accessToken, refreshToken }) {
 cookies.set(ACCESS_TOKEN, accessToken);
 cookies.set(REFRESH_TOKEN, refreshToken);
}

export function saveAccessToken(accessToken) {
 cookies.set(ACCESS_TOKEN, accessToken);
}

export function getAccessToken() {
  return cookies.get(ACCESS_TOKEN);
}

export function getRefreshToken() {
  return cookies.get(REFRESH_TOKEN);
}

export function removeTokens() {
  cookies.del(ACCESS_TOKEN);
  cookies.del(REFRESH_TOKEN);
}

export function parseToken() {
  try {
    const accessToken = cookies.get(ACCESS_TOKEN);
    const decodedToken = jwt_decode(accessToken);

    if (accessToken && decodedToken) {
      return decodedToken;
    } 
    
    const refreshToken = cookies.get(REFRESH_TOKEN);
    const decodedRefreshToken = jwt_decode(refreshToken);

    if (refreshToken && decodedRefreshToken) {
      return decodedRefreshToken;
    }
  
  } catch (err) {
    removeTokens();
    return null;
  }

  return null;
}

const tokenService = {
  saveAccessToken,
  saveTokens,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  parseToken,
};

export default tokenService;
