const baseConfig = {
  baseURI: process.env.REACT_APP_BASE_URI,
};

const endpoints = {
  auth: {
    login: "/login",
    signup: "/signup",
    refresh: "/refresh",
  },
};

const config = {
  ...baseConfig,
  endpoints,
};

export default config;
