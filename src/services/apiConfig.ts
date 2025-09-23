import axios, { AxiosInstance } from "axios";

export const authAPI: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
