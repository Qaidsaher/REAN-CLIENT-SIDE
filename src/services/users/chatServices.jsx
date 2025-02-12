import API from "../../utils/userApi";

const API_URL = "/user"; // ✅ Base URL for chat API

// ✅ Get or create a chat between Innovator & Investor
export const getOrCreateChat = async (receiverId) => {
  const response = await API.post(`${API_URL}/create-chat`, {
    receiverId,
  });
  return response.data;
};

// ✅ Send a message in a chat
export const sendMessage = async (messageData) => {
  const response = await API.post(`${API_URL}/send-message`, messageData);
  return response.data;
};

// ✅ Get all conversations for the logged-in Innovator
export const getConversations = async () => {
  const response = await API.get(`${API_URL}/conversations`);
  return response.data;
};

// ✅ Get all chats for the logged-in Innovator
export const getChats = async () => {
  const response = await API.get(`${API_URL}/chats`);
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get(`${API_URL}/chat-users`);
  return response.data;
};
// ✅ Get all chats for the logged-in Investor (🔹 This function was missing)
export const getInvestorChats = async () => {
  const response = await API.get(`${API_URL}/investor-chats`);
  return response.data;
};

// ✅ Get all messages in a specific chat
export const getMessages = async (chatId) => {
  try {
    const response = await API.get(`${API_URL}/messages/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    throw error;
  }
};

// ✅ Edit a message in a chat
export const editMessage = async (messageId, newContent) => {
  const response = await API.put(`${API_URL}/edit-message`, {
    messageId,
    newContent,
  });
  return response.data;
};

// ✅ Delete a message from a chat
export const deleteMessage = async (messageId) => {
  await API.delete(`${API_URL}/delete-message/${messageId}`);
};

// ✅ Get all investors (For Innovators to start a chat)

// ✅ Get all innovators (For Investors to start a chat)
export const getInnovators = async () => {
  const response = await API.get(`${API_URL}/innovators`);
  return response.data;
};

// ✅ Edit Profile (for both Innovators and Investors)
export const editProfile = async (profileData) => {
  const formData = new FormData();

  // Append all fields to formData
  Object.keys(profileData).forEach((key) => {
    formData.append(key, profileData[key]);
  });

  const response = await API.put(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure file uploads work properly
    },
  });

  return response.data;
};

export const updateProfile = async (profileData) => {
  const formData = new FormData();

  // Append all fields to formData
  Object.keys(profileData).forEach((key) => {
    formData.append(key, profileData[key]);
  });

  const response = await API.put(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure file uploads work properly
    },
  });

  return response.data;
};
// ✅ Get Profile (for both Innovators and Investors)
export const getProfile = async () => {
  const response = await API.get(`${API_URL}/profile`);
  return response.data;
};
export const changePassword = async (passwordData) => {
  const response = await API.post(`${API_URL}/change-password`, passwordData);
  return response.data;
};
export const deleteAccount = async () => {
  const response = await API.delete(`${API_URL}/delete-account}`);
  return response.data;
};
