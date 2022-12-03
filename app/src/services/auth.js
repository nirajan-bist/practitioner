import axios from "axios";
import config from "config";
import { axiosConfig } from "utils/http";

export const signUp = async (payload) => {
  const { data } = await axios.post(
    config.endpoints.auth.signup,
    payload,
    axiosConfig
  );
  return data;
};

export const logIn = async (payload) => {
  const { data } = await axios.post(
    config.endpoints.auth.login,
    payload,
    axiosConfig
  );
  return data;
};

export const renewToken = async (refreshToken) => {
  const { data } = await axios.post(
    config.endpoints.auth.refresh,
    { refreshToken },
    axiosConfig
  );

  return data;
};

const auth = {
  logIn,
  signUp,
  renewToken,
};

export default auth;
