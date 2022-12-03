import axios from "axios";
import config from "config";
import * as authService from "services/auth";
import * as tokenService from "services/token";

export const axiosConfig = {
  baseURL: config.baseURI,
  headers: {
    "Content-Type": "application/json",
  },
};

const http = axios.create(axiosConfig);

const requestInterceptor = async (request) => {
  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
};

let requestCbQueue = [];
let isRefreshingAccessToken = false;

export async function responseInterceptor(err) {
  const originalRequest = err.config;
  const statusCode = err.response?.status;
  
  if (statusCode === 401 && originalRequest.url !== config.endpoints.auth.refresh) {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        return onRefreshFailed();
      }
      if (isRefreshingAccessToken) {
        return subscribeNewAccessToken(originalRequest);      
      }

      isRefreshingAccessToken = true;
      const accessToken = await authService.renewToken(refreshToken);
      tokenService.saveAccessToken(accessToken);
      const newRequest = subscribeNewAccessToken(originalRequest, true);
      callRequestCallbacks();
      requestCbQueue=[];
      isRefreshingAccessToken = false;

      return newRequest;

    } catch (error) {
      onRefreshFailed();
    }
  }

  return Promise.reject(err);
}

function callRequestCallbacks(newAccessToken){
   requestCbQueue.map(cb => cb(newAccessToken));
}

function changeRequestWithNewToken(originalRequest, newAccessToken) {
  const newRequestConfig = {
    ...originalRequest,
    headers: {
      ...originalRequest.headers,
      Authorization: `Bearer ${newAccessToken}`,
    },
  };
  return newRequestConfig;  
}

function subscribeNewAccessToken(originalRequest, isInitialRequest) {
  return new Promise((resolve)=>{
    const callback = newAccessToken => {
      const newRequest = changeRequestWithNewToken(originalRequest, newAccessToken);
      resolve(http.request(newRequest));
    };

    if(isInitialRequest) {
      return requestCbQueue.unshift(callback);
    }

    requestCbQueue.push(callback);
  })
}

function onRefreshFailed() {
  requestCbQueue = [];
  tokenService.removeTokens();
  window.location.href = config.endpoints.auth.login;
}

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use((response) => response, responseInterceptor);

export default http;
