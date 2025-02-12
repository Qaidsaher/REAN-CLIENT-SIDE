import api from "../../utils/api";

const API_URL = "/notification"; // Base API URL for notifications

// Get all notifications
export const getNotifications = async () => {
  const response = await api.get(`${API_URL}/all`);
  return response.data;
};

// Get a single notification by ID
export const getNotificationById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new notification
export const createNotification = async (notification) => {
  const response = await api.post(`${API_URL}/create`, notification);
  return response.data;
};

// Update notification by ID
export const updateNotification = async (id, notification) => {
  const response = await api.put(`${API_URL}/update/${id}`, notification);
  return response.data;
};

// Delete notification by ID
export const deleteNotification = async (id) => {
  await api.delete(`${API_URL}/delete/${id}`);
};
