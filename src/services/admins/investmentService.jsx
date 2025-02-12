import api from "../../utils/api";

const API_URL = "/investment"; // Base API URL for investments

// Get all investments
export const getInvestments = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single investment by ID
export const getInvestmentById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new investment (Admin only)
export const createInvestment = async (investment) => {
  const response = await api.post(`${API_URL}/create`, investment);
  return response.data;
};

// Update investment by ID (Admin only)
export const updateInvestment = async (id, investment) => {
  const response = await api.put(`${API_URL}/update/${id}`, investment);
  return response.data;
};

// Delete investment by ID (Admin only)
export const deleteInvestment = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
