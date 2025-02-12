// utils/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add Authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (role) {
      config.headers["User-Role"] = role;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    alert("error "+error)
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
