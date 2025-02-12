import api from "../../utils/api";

const API_URL = "/innovator"; // Base API URL for innovators

// Get all innovators
export const getInnovators = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single innovator by ID
export const getInnovatorById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new innovator (Admin only)
export const createInnovator = async (innovator) => {
  const response = await api.post(`${API_URL}/create`, innovator);
  return response.data;
};

// Update innovator by ID (Admin only)
export const updateInnovator = async (id, innovator) => {
  const response = await api.put(`${API_URL}/update/${id}`, innovator);
  return response.data;
};

// Delete innovator by ID (Admin only)
export const deleteInnovator = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
