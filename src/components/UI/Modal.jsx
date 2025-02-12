import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-red-600 font-bold">X</button>
        </div>
        {children}
        <button onClick={onClose} className="bg-gray-600 text-white px-4 py-2 mt-4 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
