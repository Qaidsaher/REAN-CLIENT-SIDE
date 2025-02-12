// src/components/Innovator/Chat/ChatList.js
import React, { useState } from "react";

const ChatList = ({ onSelectConversation, selectedConversation }) => {
  // Sample conversations with unread counts
  const chats = [
    {
      id: 1,
      name: "Investor One",
      lastMessage: "Looking forward to discussing your innovation.",
      unread: 2,
    },
    {
      id: 2,
      name: "Investor Two",
      lastMessage: "Can you share more details?",
      unread: 0,
    },
    {
      id: 3,
      name: "Investor Three",
      lastMessage: "I have some questions.",
      unread: 5,
    },
  ];

  const [search, setSearch] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px] flex flex-col">
      {/* Header with Title and Search */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Conversations</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin smooth-scroll space-y-2">
        {filteredChats.map((chat, index) => {
          // Only on big screens (md:) we highlight the selected conversation.
          const isSelected =
            selectedConversation && selectedConversation.id === chat.id;
          const selectedClasses = isSelected
            ? "md:bg-indigo-100 md:border-indigo-500"
            : "";
          return (
            <div
              key={chat.id}
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectConversation(chat);
                }}
                className={`block px-3 py-2 border border-gray-200 rounded-md transition-colors duration-300 hover:bg-indigo-50 hover:border-indigo-300 relative ${selectedClasses}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {chat.name}
                    </h3>
                    <p className="text-gray-600">
                      {chat.lastMessage.length > 40
                        ? `${chat.lastMessage.substring(0, 40)} ...`
                        : chat.lastMessage}
                    </p>
                  </div>
                  {/* Unread Badge */}
                  {/* Unread Badge */}
                  {chat.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
