import config from "config";
import { logOut as logoutFromServer } from "services/auth";
import { removeTokens } from "services/token";

export function logOut() {
  logoutFromServer()
  removeTokens();
  window.location.href = config.endpoints.auth.login;
}