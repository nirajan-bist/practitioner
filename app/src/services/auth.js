import config from "config";
import http from "utils/http";

export const signUp = async (payload) => {
  const { data } = await http.post(config.endpoints.auth.signup, payload);
  return data;
};

export const logIn = async (payload) => {
  const { data } = await http.post(config.endpoints.auth.login, payload);
  return data;
};

export const renewToken = async (refreshToken) => {
  const { data } = await http.post(config.endpoints.auth.refresh, {
    refreshToken,
  });
  return data;
};

const auth = {
  logIn,
  signUp,
  renewToken,
};

export default auth;
