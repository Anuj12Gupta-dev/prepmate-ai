import axios from "axios";
import { Clerk } from "@clerk/clerk-react";

const clerk = Clerk;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token to every request
axiosInstance.interceptors.request.use(async (config) => {
  const token = await clerk.session?.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
