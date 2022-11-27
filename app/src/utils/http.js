import axios from "axios";

import config from "config";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "constants";

import cookies from "./cookies";
import * as authService from "services/auth";
import * as tokenService from "services/token";

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

let unauthorizedRequestQueue = [];
let isRefreshingAccessToken = false;

export async function responseInterceptor(err) {
  const originalRequest = err.config;
  if (!originalRequest) {
    return Promise.reject(err);
  }
  const code = err.response && err.response.status;
  const path = originalRequest.url;
  if (code === 401 && originalRequest.url === config.endpoints.auth.refresh) {
    clearLocalAuth();

    return Promise.reject(err);
  }

  if ( path !== config.endpoints.auth.refresh) {
    try {
      const {refreshToken} = tokenService.getTokens();
      if (!refreshToken) {
        return clearLocalAuth();
      }
      if (!isRefreshingAccessToken) {
        isRefreshingAccessToken = true;
        const { accessToken, refreshToken: newRefreshToken } = await authService.renewToken(refreshToken);
        tokenService.saveTokens({accessToken, refreshToken: newRefreshToken});
        const newRequest = changeAccessToken(originalRequest, accessToken);

        callRequestsFromUnauthorizedQueue(accessToken);

        clearUnauthorizedRequestQueue();

        isRefreshingAccessToken = false;
        return http.request(newRequest);
      }

      const retryRequest = new Promise((resolve) => {
        subscribeToAccessTokenRefresh(function (refreshedAccessToken) {
          const newRequest = changeAccessToken(originalRequest, refreshedAccessToken);

          resolve(http.request(newRequest));
        });
      });

      return retryRequest;
    } catch (error) {
      if (code !== 401) {
        return;
      }

      if (path !== config.endpoints.auth.refresh) {
        return;
      }

      clearLocalAuth();
    }
  }

  return Promise.reject(err);
}

/**
 * Changes access token of the provided request.
 *
 * @param {Object} originalRequest
 * @param {Object} newToken
 */
function changeAccessToken(originalRequest, newToken) {
  return {
    ...originalRequest,
    headers: {
      ...originalRequest.headers,
      Authorization: `Bearer ${newToken}`,
    },
  };
}

/**
 * Subscribe retry request to access token refresh.
 * Add request to unauthorized request queue.
 *
 * @param {Function} callback
 */
function subscribeToAccessTokenRefresh(callback) {
  unauthorizedRequestQueue.push(callback);
}

/**
 * Calls pending requests from unauthorized request queue.
 *
 * @param {String} refreshedAccessToken
 */
function callRequestsFromUnauthorizedQueue(refreshedAccessToken) {
  unauthorizedRequestQueue.map((cb) => cb(refreshedAccessToken));
}

/**
 * Clears unauthorized request queue.
 */
function clearUnauthorizedRequestQueue() {
  unauthorizedRequestQueue = [];
}

/**
 * Clear tokens and redirect to login page.
 */
function clearLocalAuth() {
  tokenService.removeTokens();
  window.location.href = config.endpoints.auth.login;
}

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use((response) => response, responseInterceptor);

export default http;
