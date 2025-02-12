import api from "../../utils/api";

const API_URL = "/investor"; // Base API URL for investors

// Get all investors
export const getInvestors = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single investor by ID
export const getInvestorById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new investor (Admin only)
export const createInvestor = async (investor) => {
  const response = await api.post(`${API_URL}/create`, investor);
  return response.data;
};

// Update investor by ID (Admin only)
export const updateInvestor = async (id, investor) => {
  const response = await api.put(`${API_URL}/update/${id}`, investor);
  return response.data;
};

// Delete investor by ID (Admin only)
export const deleteInvestor = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
