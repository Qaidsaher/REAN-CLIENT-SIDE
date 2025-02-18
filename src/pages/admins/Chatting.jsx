import React, { useEffect, useState } from "react";
import { FaTrash, FaComments } from "react-icons/fa";
import { getChats, deleteChat } from "../../services/admins/chatService";
import AdminLayout from "../../layouts/AdminLayout";

const Chatting = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [showModal, setShowModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchChats = async () => {
    try {
      const data = await getChats();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      showMessage("Failed to fetch chats.", "error");
    }
  };

  const openDeleteModal = (chatId) => {
    setSelectedChatId(chatId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedChatId(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!selectedChatId) return;
    try {
      await deleteChat(selectedChatId);
      fetchChats();
      showMessage("Chat deleted successfully!", "success");
      closeModal();
    } catch (error) {
      console.error("Error deleting chat:", error);
      showMessage("Failed to delete chat.", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"chats"}>
      <div className="p-6 bg-gray-50 ">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-6 text-indigo-700 flex items-center gap-3">
          <FaComments className="text-indigo-600" /> Chat Management
        </h2>

        {/* Notification Banner */}
        {message && (
          <div
            className={`mb-4 p-4 text-white text-center rounded-lg transition ${
              messageType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Responsive Chat Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-md shadow-lg bg-white">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Investor Name</th>
                <th className="py-3 px-4 text-left">Innovator Name</th>
                <th className="py-3 px-4 text-center">Message Count</th>
                <th className="py-3 px-4 text-center">Created At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <tr
                    key={chat.chatId}
                    className="hover:bg-gray-100 transition-all duration-300"
                  >
                    <td className="py-4 px-4 border-b border-gray-200">
                      {chat.investorName}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      {chat.innovatorName}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center font-semibold text-indigo-600">
                      {chat.messageCount}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      {new Date(chat.createdAt).toLocaleDateString()} - {new Date(chat.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <button
                        onClick={() => openDeleteModal(chat.chatId)}
                        className="text-red-600 hover:text-red-800 px-3 py-2 rounded-full  transition-all hover:scale-110 hover:cursor-pointer"
                        title="Delete Chat"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No chats available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
              <h3 className="text-xl font-semibold mb-4 text-center text-red-700">
                Confirm Deletion
              </h3>
              <p className="text-gray-700 text-center mb-6">
                Are you sure you want to delete this chat? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Chatting;
