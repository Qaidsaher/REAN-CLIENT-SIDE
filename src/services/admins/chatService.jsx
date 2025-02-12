import api from "../../utils/api";

const API_URL = "/chats"; // Base API URL for chats

// Get all chat conversations
export const getChats = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single chat by ID
export const getChatById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new chat conversation
export const createChat = async (chat) => {
  const response = await api.post(`${API_URL}/create`, chat);
  return response.data;
};

// Update chat by ID
export const updateChat = async (id, chat) => {
  const response = await api.put(`${API_URL}/update/${id}`, chat);
  return response.data;
};

// Delete chat by ID
export const deleteChat = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
