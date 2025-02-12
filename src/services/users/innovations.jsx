import API from "../../utils/userApi";

const API_URL = "/user";

// ✅ Get all innovations of the logged-in user
export const getInnovations = async () => {
  const response = await API.get(`${API_URL}/innovations-all`);
  return response.data;
};
// ✅ Get Innovation by ID
export const getInnovationById = async (id) => {
  try {
    const response = await API.get(`${API_URL}/innovations/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching innovation:", error);
    throw error;
  }
};

// ✅ Create a new innovation
export const createInnovation = async (innovation) => {
  const response = await API.post(`${API_URL}/innovations`, innovation);
  return response.data;
};

// ✅ Update an innovation
export const updateInnovation = async (id, innovation) => {
  const response = await API.put(`${API_URL}/innovations/${id}`, innovation);
  return response.data;
};

// ✅ Delete an innovation
export const deleteInnovation = async (id) => {
  await API.delete(`${API_URL}/innovations/${id}`);
};
// ✅ Get all categories
export const getCategories = async () => {
  const response = await API.get(`${API_URL}/categories`);
  return response.data;
};
// ✅ Get all chats of the logged-in user
export const getChats = async () => {
  const response = await API.get(`${API_URL}/chats`);
  return response.data;
};

// ✅ Get all chats of the logged-in user
export const getConversations = async () => {
  const response = await API.get(`${API_URL}/conversations`);
  return response.data;
};

// ✅ Send a new message
export const sendMessage = async (messageData) => {
  const response = await API.post(`${API_URL}/chats`, messageData);
  return response.data;
};

// ✅ Get all investors (For Selecting a Receiver)
export const getInvestors = async () => {
  const response = await API.get(`${API_URL}/investors`);
  return response.data;
};





