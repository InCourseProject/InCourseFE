import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("Authorization");
  const refreshToken = localStorage.getItem("RefreshToken");
  config.headers.authorization = accessToken;
  config.headers.refreshToken = refreshToken;
  return config;
});