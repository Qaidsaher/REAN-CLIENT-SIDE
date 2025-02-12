import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getChats,
  createChat,
  updateChat,
  deleteChat,
} from "../../services/admins/chatService";
import AdminLayout from "../../layouts/AdminLayout";

const Chatting = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchChats();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchChats = async () => {
    try {
      const data = await getChats();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      showMessage("Error fetching chats", "error");
    }
  };

  const handleCreate = async (newChat) => {
    try {
      await createChat(newChat);
      fetchChats();
      showMessage("Chat created successfully", "success");
    } catch (error) {
      console.error("Error creating chat:", error);
      showMessage("Error creating chat", "error");
    }
  };

  const handleEdit = async (updatedChat) => {
    try {
      await updateChat(updatedChat._id, updatedChat);
      fetchChats();
      showMessage("Chat updated successfully", "success");
    } catch (error) {
      console.error("Error updating chat:", error);
      showMessage("Error updating chat", "error");
    }
  };

  const handleDelete = async (chatId) => {
    try {
      await deleteChat(chatId);
      fetchChats();
      showMessage("Chat deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting chat:", error);
      showMessage("Error deleting chat", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"chats"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Chats</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={chats}
          fields={["sender", "receiver", "message","status"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Chatting;
