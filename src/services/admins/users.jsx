import API from "../../utils/userApi";

const API_URL = "/user"; // ✅ Base URL for user API

// ✅ Create a new user
export const createUser = async (userData) => {
  const response = await API.post(`${API_URL}/create`, userData);
  return response.data;
};

// ✅ Get all users
export const getAllUsers = async () => {
  const response = await API.get(`${API_URL}/all`);
  return response.data;
};

// ✅ Get user by ID
export const getUserById = async (userId) => {
  const response = await API.get(`${API_URL}/${userId}`);
  return response.data;
};

// ✅ Update user by ID
export const updateUser = async (userId, updatedData) => {
  const response = await API.put(`${API_URL}/update/${userId}`, updatedData);
  return response.data;
};

// ✅ Delete user by ID
export const deleteUser = async (userId) => {
  const response = await API.delete(`${API_URL}/delete/${userId}`);
  return response.data;
};

// ✅ Get user profile
export const getProfile = async () => {
  const response = await API.get(`${API_URL}/profile`);
  return response.data;
};

// ✅ Update user profile
export const updateProfile = async (profileData) => {
  const formData = new FormData();
  Object.keys(profileData).forEach(key => formData.append(key, profileData[key]));
  const response = await API.put(`${API_URL}/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};

// ✅ Change password
export const changePassword = async (passwordData) => {
  const response = await API.post(`${API_URL}/change-password`, passwordData);
  return response.data;
};

// ✅ Delete account
export const deleteAccount = async () => {
  const response = await API.delete(`${API_URL}/delete-account`);
  return response.data;
};

// ✅ Get notifications
export const getNotifications = async () => {
  const response = await API.get(`${API_URL}/notifications`);
  return response.data;
};

// ✅ Get innovators
export const getInnovators = async () => {
  const response = await API.get(`${API_URL}/innovators`);
  return response.data;
};

// ✅ Get investors
export const getInvestors = async () => {
  const response = await API.get(`${API_URL}/investors`);
  return response.data;
};

// ✅ Get chat users
export const getUsers = async () => {
  const response = await API.get(`${API_URL}/chat-users`);
  return response.data;
};
