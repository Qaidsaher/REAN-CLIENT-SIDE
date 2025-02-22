import React, { useEffect } from "react";
import { FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Notification = ({ message, messageType, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div 
      className={`fixed top-5 z-50 right-5 flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-opacity duration-500 shadow-lg 
        ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}>
      {messageType === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;
