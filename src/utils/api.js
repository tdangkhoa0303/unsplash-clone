import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credential: "include",
  withCredentials: true,
});

export const setToken = (token) =>
  (api.defaults.headers.common["x-access-token"] = token);

export const requestSignUp = (data) => api.post("/auth/signUp", data);

export const requestLogin = (data) => api.post("/auth/login", data);

export const requestTokenRefresh = () => api.post("/auth/refreshToken");

export const createPhoto = (data) => api.post("/photo", data);

export const getPhotos = (page = 1) => api.get(`/photo?p=${page}`);

export const reactPhoto = (id) => api.get(`/photo/react?photo=${id}`);

export const getPhoto = (id) => api.get(`/photo/single?id=${id}`);
