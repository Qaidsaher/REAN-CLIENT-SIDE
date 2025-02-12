
import api from "../utils/api";

export const getAdminProfile = async () => {
  const response = await api.get("/admin/profile");
  return response.data;
};
export const getAllCounts = async () => {
  const response = await api.get("/admin/all-counts");
  return response.data;
};
export const adminLogin = async (email, password) => {
  const response = await api.post("/admin/login", { email, password });

  localStorage.setItem(
    "user",
    JSON.stringify({ token: response.data.token })
  );
  return response.data;
};

export const adminLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/admin/login";
};

export const createAdmin = async (adminData) => {
  const response = await api.post("/admin/create", adminData);
  return response.data;
};

export const updateAdmin = async (adminId, updatedData) => {
  const response = await api.put(`/admin/update/${adminId}`, updatedData);
  return response.data;
};

export const deleteAdmin = async (adminId) => {
  const response = await api.delete(`/admin/delete/${adminId}`);
  return response.data;
};

export const changeAdminRole = async (adminId, newRole) => {
  const response = await api.put("/admin/change-role", { adminId, role: newRole });
  return response.data;
};

// import api from "../../utils/api";

const API_URL = "/admin"; // Base API URL for admin services

// Get admin profile
export const getProfile = async () => {
  const response = await api.get(`${API_URL}/profile`);
  return response.data;
};

// Update admin profile
export const updateProfile = async (profileData) => {
  const response = await api.put(`${API_URL}/update-profile`, profileData);
  return response.data;
};

// Delete admin account
export const deleteAccount = async () => {
  const response = await api.delete(`${API_URL}/delete-account`);
  return response.data;
};

// Logout admin
export const logout = async () => {
  const response = await api.post(`${API_URL}/logout`);
  return response.data;
};
