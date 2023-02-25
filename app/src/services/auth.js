import axios from "axios";
import config from "config";
import { handleError } from "utils/error";
import { axiosConfig } from "utils/http";
import { getRefreshToken } from "./token";

export const signUp = async (payload) => {
  try {
    const { data } = await axios.post(
      config.endpoints.auth.signup,
      payload,
      axiosConfig
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const logIn = async (payload) => {
  try {
    const { data } = await axios.post(
      config.endpoints.auth.login,
      payload,
      axiosConfig
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const logOut = async () => {
  try {
    const { data } = await axios.post(
      config.endpoints.auth.logout,
      {refreshToken: getRefreshToken()},
      axiosConfig
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const renewToken = async (refreshToken) => {
  try {
    const { data } = await axios.post(
      config.endpoints.auth.refresh,
      { refreshToken },
      axiosConfig
    );
  
    return data;
  } catch (error) {
    handleError(error);
  }
};

const auth = {
  logIn,
  signUp,
  renewToken,
};

export default auth;
