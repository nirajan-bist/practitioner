const baseConfig = {
  baseURI: process.env.REACT_APP_BASE_URI,
};

const endpoints = {
  auth: {
    login: "/login",
    signup: "/signup",
    refresh: "/refresh",
    logout: "/logout",
  },
};

const config = {
  ...baseConfig,
  endpoints,
  env: process.env.REACT_APP_ENV,
};

export default config;
