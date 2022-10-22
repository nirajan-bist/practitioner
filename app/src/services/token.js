import cookies from "utils/cookies";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants";

export function saveTokens({ accessToken, refreshToken }) {
  cookies.set(ACCESS_TOKEN, accessToken);
  cookies.set(REFRESH_TOKEN, refreshToken);
}

export function removeTokens() {
  cookies.del(ACCESS_TOKEN);
  cookies.del(REFRESH_TOKEN);
}

const tokenService = {
  saveTokens,
  removeTokens,
};

export default tokenService;
