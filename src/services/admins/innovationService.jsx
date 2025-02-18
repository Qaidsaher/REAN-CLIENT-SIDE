import api from "../../utils/api";

const API_URL = "/innovation"; // Base API URL for innovations

// Get all innovations
export const getInnovations = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single innovation by ID
export const getInnovationById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new innovation (Admin only)
export const createInnovation = async (innovation) => {
  const headers = {
    "Content-Type": "multipart/form-data", // Required for image/video uploads
  };

  const response = await api.post(`${API_URL}/create`, innovation, { headers });
  return response.data;
};

// Update innovation by ID (Admin only)
export const updateInnovation = async (id, innovation) => {
  const response = await api.put(`${API_URL}/update/${id}`, innovation);
  return response.data;
};

// Delete innovation by ID (Admin only)
export const deleteInnovation = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};