import config from "config";
import { removeTokens } from "services/token";

export function logOut() {
  removeTokens();
  window.location.href = config.endpoints.auth.login;
}