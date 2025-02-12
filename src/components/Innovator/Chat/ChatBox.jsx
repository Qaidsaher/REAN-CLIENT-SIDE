// src/components/Innovator/Chat/ChatBox.js
import React, { useState, useRef, useEffect } from "react";

const ChatBox = ({ onBack, showBackButton, conversation }) => {
  // For demonstration, assume "Innovator" is the current user.
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Innovator",
      text: "Hello, how can I help you?",
      time: "10:30 AM",
      read: true,
    },
    {
      id: 2,
      sender: "Investor",
      text: "I have a question about your innovation.",
      time: "10:32 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  // Track which message's menu is open (by message id)
  const [openMenuId, setOpenMenuId] = useState(null);
  const fileInputRef = useRef(null);

  // Close the open menu if user clicks anywhere outside the menu or its toggle button.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMenuId !== null &&
        !e.target.closest(".message-menu") &&
        !e.target.closest(".message-menu-toggle")
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const handleSend = () => {
    if (newMessage.trim() || attachedFile) {
      // Create a formatted time string.
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHour = hours % 12 || 12;
      const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;
      const timeString = `${formattedHour}:${formattedMinute} ${ampm}`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "Innovator", // current user
          text: newMessage || (attachedFile && attachedFile.name),
          time: timeString,
          read: false, // new messages start as not read
        },
      ]);
      setNewMessage("");
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  // Message menu handlers (dummy implementations)
  const handleDelete = (id) => {
    console.log("Delete message", id);
    setMessages((msgs) => msgs.filter((msg) => msg.id !== id));
    setOpenMenuId(null);
  };

  const handleEdit = (id) => {
    console.log("Edit message", id);
    // Implement your edit functionality here
    setOpenMenuId(null);
  };

  const handleForward = (id) => {
    console.log("Forward message", id);
    // Implement your forward functionality here
    setOpenMenuId(null);
  };

  // Toggle menu open/close for a given message
  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={onBack}
              className="mr-3 text-gray-500 hover:text-gray-700 md:hidden"
              aria-label="Back to Conversations"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h2 className="text-xl font-bold text-gray-800">
            {conversation ? conversation.name : "Messages"}
          </h2>
        </div>
      </div>

      {/* Messages Container */}
      {/* Added 'flex flex-col' here so that self-start/self-end work as intended */}
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-thin smooth-scroll space-y-4 pr-2">
        {messages.map((msg) => {
          // Alignment: if sender is "Innovator" (current user), show on left; else on right.
          const alignmentClasses =
            msg.sender === "Innovator"
              ? "self-start bg-indigo-100 text-white" // current user's messages on left
              : "self-end bg-gray-200 text-gray-900";   // other user's messages on right
          return (
            <div
              key={msg.id}
              className={`relative max-w-xs min-w-[100px] px-3 pr-2 py-1 rounded-md shadow transition fade-in-up ${alignmentClasses}`}
            >
              <p className="pr-4">{msg.text}</p>
              <div className="mt-0.5 flex items-center justify-between text-xs text-gray-700">
                <span>{msg.time}</span>
                {msg.sender !== "Innovator" && (
                  <span>
                    {msg.read ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-500 inline-block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M13.707 5.293a1 1 0 00-1.414 0L8 9.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 inline-block"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </div>

              {/* Message Menu Toggle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(msg.id);
                }}
                className="message-menu-toggle absolute top-1 -right-1 text-gray-500 hover:text-gray-700 "
                aria-label="Message options"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 12v.01M12 18v.01" />
                </svg>
              </button>

              {/* Message Options Menu */}
              {openMenuId === msg.id && (
                <div className="message-menu absolute top-6 right-1 z-10 w-28 bg-white shadow-md rounded border border-gray-200 z-50">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(msg.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleForward(msg.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Forward
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input & Attach File */}
      <div className="flex items-center space-x-2 mt-4">
        {/* Attach File Button */}
        <button
          onClick={handleAttachClick}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-200"
          aria-label="Attach File"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656L6.343 9.657a6 6 0 108.485 8.485"
            />
          </svg>
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        {/* Message Input */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
