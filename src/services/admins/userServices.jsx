import API from "../../utils/api";

const ADMIN_USERS_URL = "/admin/users";

// ✅ Get all users
export const getAllUsers = async () => {
  const response = await API.get(ADMIN_USERS_URL);
  return response.data;
};

// ✅ Get user by ID
// Make sure to include the userType in the query (e.g., /admin/users/123?userType=innovator)
export const getUserById = async (id, userType) => {
  const response = await API.get(`${ADMIN_USERS_URL}/${id}?userType=${userType}`);
  return response.data;
};

// ✅ Create user (include userType in the payload)
export const createUser = async (userData) => {
  const response = await API.post(ADMIN_USERS_URL, userData);
  return response.data;
};

// ✅ Update user (include userType in the payload)
export const updateUser = async (id, userData) => {
  const response = await API.put(`${ADMIN_USERS_URL}/${id}`, userData);
  return response.data;
};

// ✅ Delete user (include userType as query param)
export const deleteUser = async (id, userType) => {
  const response = await API.delete(`${ADMIN_USERS_URL}/${id}?userType=${userType}`);
  return response.data;
};
