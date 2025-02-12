import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (role) {
        config.headers["User-Role"] = role;
    }

    return config;
}, (error) => Promise.reject(error));

export default API;
