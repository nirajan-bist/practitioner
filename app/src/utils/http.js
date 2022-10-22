import axios from "axios";

import config from "config";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants";

import cookies from "./cookies";
import { renewToken } from "services/auth";

const http = axios.create({
  baseURL: config.baseURI,
  headers: {
    "Content-Type": "application/json",
  },
});

const requestInterceptor = async (request) => {
  const accessToken = cookies.get(ACCESS_TOKEN);

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
};

const responseInterceptor = async (error) => {
  if (!error.response) {
    throw error;
  }

  const originalRequest = error.config;
  const { code } = error.response.data.error || {};

  if (code === 401) {
    const refreshToken = cookies.get(REFRESH_TOKEN);

    try {
      const { accessToken } = await renewToken(refreshToken);
      cookies.set(ACCESS_TOKEN, accessToken);
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return http.request(originalRequest);
    } catch (err) {
      window.location.href = config.endpoints.login;
      return;
    }
  }

  throw error.response;
};

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use((response) => response, responseInterceptor);

export default http;
