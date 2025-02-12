import api from "../../utils/api";

const API_URL = "/admin"; // Base API URL for admins

// Get all admins
export const getAdmins = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single admin by ID
export const getAdminById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new admin (Admin only)
export const createAdmin = async (admin) => {
  const response = await api.post(`${API_URL}/create`, admin);
  return response.data;
};

// Update admin by ID (Admin only)
export const updateAdmin = async (id, admin) => {
  const response = await api.put(`${API_URL}/update/${id}`, admin);
  return response.data;
};

// Delete admin by ID (Admin only)
export const deleteAdmin = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
