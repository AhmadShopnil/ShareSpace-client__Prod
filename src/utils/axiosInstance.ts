// lib/axiosInstance.ts
import { variables } from "@/config";
import axios from "axios";
import dotenv from "dotenv";

const axiosInstance = axios.create({
  // Base URL for your API
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://server-flate-share.vercel.app/api",
  // baseURL: variables.server_url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Or use cookies if you prefer

    if (token) {
      config.headers["authorization"] = token; // Using a custom header instead of Authorization
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
