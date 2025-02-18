import React from "react";
import { FaTrash, FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";

const Notifications = ({ notifications, onDelete }) => {
  // Notification Types
  const notificationTypes = {
    message: { icon: <FaEnvelope size={18} />, textColor: "text-blue-800", borderColor: "border-blue-300", bgColor: "bg-blue-50" },
    success: { icon: <FaCheckCircle size={18} />, textColor: "text-green-800", borderColor: "border-green-300", bgColor: "bg-green-50" },
    alert: { icon: <FaExclamationTriangle size={18} />, textColor: "text-red-800", borderColor: "border-red-300", bgColor: "bg-red-50" },
    reminder: { icon: <FaCalendarAlt size={18} />, textColor: "text-yellow-800", borderColor: "border-yellow-300", bgColor: "bg-yellow-50" },
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <FaEnvelope size={25} className="text-indigo-600" /> Notifications
      </h2>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((note) => {
            const type = notificationTypes[note.type] || notificationTypes.message;
            return (
              <div
                key={note.id}
                className={`flex items-start justify-between border ${type.borderColor} ${type.bgColor} rounded-md p-4 hover:shadow-lg transition relative`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${type.textColor}`}>{type.icon}</div>
                  <div>
                    <h3 className={`text-lg font-semibold ${type.textColor}`}>{note.title}</h3>
                    <p className="text-gray-600 mt-1">{note.description}</p>
                    <span className="text-gray-500 text-sm block mt-2">{note.date}</span>
                  </div>
                </div>
                {/* Delete Icon */}
                <button
                  onClick={() => onDelete(note.id)}
                  className="text-red-500 hover:text-red-700 transition ml-1 "
                  title="Delete Notification"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center">No notifications to show.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
