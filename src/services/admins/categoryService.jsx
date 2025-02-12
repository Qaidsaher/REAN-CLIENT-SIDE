import api from "../../utils/api";

const API_URL = "/categories"; // Base API URL for categories

// Get all categories
export const getCategories = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single category by ID
export const getCategoryById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new category (Admin only)
export const createCategory = async (category) => {
  const response = await api.post(`${API_URL}/create`, category);
  return response.data;
};

// Update category by ID (Admin only)
export const updateCategory = async (id, category) => {
  const response = await api.put(`${API_URL}/update/${id}`, category);
  return response.data;
};

// Delete category by ID (Admin only)
export const deleteCategory = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
