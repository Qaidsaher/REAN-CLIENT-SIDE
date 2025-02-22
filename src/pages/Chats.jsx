import React, { useEffect, useState, useRef } from "react";
import {
  getChats,
  sendMessage,
  getUsers,
  getOrCreateChat,
  getMessages,
} from "../services/users/chatServices";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaPlus,
  FaUserCircle,
  FaArrowLeft,
  FaSearch,
  FaTimes,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";
const Chats = () => {
  const { user, role } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileView, setMobileView] = useState("list"); // "list" or "chat"
  const isInvestor = role?.toLowerCase() === "investor";
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchConversations();
    fetchParticipants();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await getChats();
      setConversations(data);
    } catch (error) {
      console.error("❌ Error fetching conversations:", error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const data = await getUsers();
      setParticipants(data);
    } catch (error) {
      console.error("❌ Error fetching participants:", error);
    }
  };

  const fetchMessages = async (chat) => {
    try {
      setSelectedChat(chat._id);
      setSelectedChatUser(chat.participant);
      setMobileView("chat"); // Switch to chat view on mobile
      const data = await getMessages(chat._id);
      setMessages(data);

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    try {
      await sendMessage({
        chatId: selectedChat,
        senderId: user.id,
        senderType: role.replace(/^./, (char) => char.toUpperCase()),
        content: message,
      });

      setMessage("");
      fetchMessages({ _id: selectedChat, participant: selectedChatUser });
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  const handleStartChat = async (receiverId) => {
    if (!receiverId) return;

    try {
      const chat = await getOrCreateChat(receiverId);
      fetchConversations();
      fetchMessages(chat);
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Error starting chat:", error);
    }
  };

  const closeModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  return (
    <UserLayout selectedPage={"chat"}>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ✅ Conversations Sidebar */}
          <div
            className={`bg-white shadow-md rounded-md p-5 h-[650px] overflow-y-auto relative ${
              mobileView === "list" ? "" : "hidden md:block"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Chats</h2>

            {/* ✅ Search Conversations */}
            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 p-2 border border-gray-300 rounded-full focus:ring focus:ring-blue-300"
              />
            </div>

            {/* ✅ Conversations List */}
            {conversations.map((chat) => (
              <motion.div
                key={chat._id}
                className={`p-2 flex justify-between items-center rounded-md shadow-sm cursor-pointer transition-all my-2 ${
                  selectedChat === chat._id
                    ? "bg-indigo-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => fetchMessages(chat)}
              >
                <div className="flex items-center gap-2">
                  {chat.participant?.photo ? (
                    // ✅ Show User's Profile Photo if Available
                    <img
                      src={`${chat.participant.photo}`}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                    />
                  ) : (
                    // ✅ Fallback to Default User Icon if No Photo
                    <FaUserCircle size={30} className="text-indigo-600" />
                  )}{" "}
                  <div>
                    <strong className="text-gray-800 text-md">
                      {chat.participant?.firstName} {chat.participant?.lastName}
                    </strong>
                    <p className="text-sm text-gray-500">
                      {chat.lastMessage?.content || "No messages yet."}
                    </p>
                  </div>
                </div>
                {chat.unreadMessages > 0 && (
                  <span className="p-2 bg-green-500 text-white text-[10px] flex justify-center items-center text-center rounded-full w-[22px] h-[22px]">
                    {chat.unreadMessages}
                  </span>
                )}
              </motion.div>
            ))}

            {/* Floating Start Chat Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full hover:scale-105 transition-transform duration-200 shadow-md p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              <FaPlus size={16} />
            </button>
          </div>

          {/* ✅ Chat Messages Section */}
          <div
            className={`bg-white shadow-md rounded-md flex flex-col md:col-span-2 h-[650px] ${
              mobileView === "chat" ? "" : "hidden md:block"
            }`}
          >
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center  bg-white shadow-xl p-2 rounded-lg border-indigo-500">
                  {/* Back Button for Mobile */}
                  <button
                    onClick={() => setMobileView("list")}
                    className="md:hidden px-2 text-indigo-500 hover:text-indigo-700 transition-transform transform hover:scale-110"
                  >
                    <FaArrowLeft size={30} className="font-bold" />
                  </button>

                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    {selectedChatUser?.photo ? (
                      // ✅ Show User's Profile Photo if Available
                      <img
                        src={`${selectedChatUser.photo}`}
                        alt="User Profile"
                        className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-md object-cover"
                      />
                    ) : (
                      // ✅ Fallback to Default User Icon if No Photo
                      <FaUserCircle size={38} className="text-indigo-600" />
                    )}

                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {selectedChatUser?.firstName}{" "}
                        {selectedChatUser?.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">Active Now</p>{" "}
                      {/* Status Placeholder */}
                    </div>
                  </div>
                </div>

                {/* Messages Section */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col max-w-xs p-2 rounded-lg shadow-md ${
                        msg.sender === user.id
                          ? "bg-indigo-500 text-white self-end ml-auto"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {/* Message Content */}
                      <p className="text-md">{msg.content}</p>

                      {/* Timestamp & Read/Unread Status */}
                      <div className="flex justify-between items-center text-xs opacity-80 mt-1">
                        <span>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {/* Read Status */}
                        {msg.status == "read" ? (
                          <FaCheckDouble className="text-blue-500" size={14} />
                        ) : (
                          <FaCheck className="text-gray-400" size={14} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                {/* Send Message */}
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center p-3  bg-white shadow-md rounded-b-lg"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    required
                  />
                  <button
                    type="submit"
                    className="ml-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full hover:scale-105 transition-transform duration-200 shadow-md"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </>
            ) : (
              <p className="text-center text-gray-500 h-full flex justify-center items-center p-4">
                Select a conversation to view messages.
              </p>
            )}
          </div>
        </div>
        {/* Start Chat Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-white shadow-2xl bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              className="bg-white p-2 rounded-md shadow-sm relative px-4 w-80 max-h-[400px] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <FaTimes size={25} color="red" />
              </button>

              {/* Modal Title */}
              <h2 className="text-lg font-semibold mb-4 mt-2">
                Start a New Chat
              </h2>

              {/* Scrollable List of Participants */}
              <div className="space-y-2">
                {participants.map((p) => (
                  <div
                    key={p._id}
                    className="cursor-pointer p-2 hover:bg-gray-200 rounded-md shadow-md"
                    onClick={() => handleStartChat(p._id)}
                  >
                    {p.firstName} {p.lastName}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Chats;
