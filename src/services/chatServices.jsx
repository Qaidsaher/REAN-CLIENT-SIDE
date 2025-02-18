


import API from "../utils/userApi";

const API_URL = "/user/chat"; // ✅ Base URL for chat API

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

// ✅ Get all chats for the logged-in Innovator
export const getChats = async () => {
  const response = await API.get(`${API_URL}/chats`);
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get(`${API_URL}/chat-users`);
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
