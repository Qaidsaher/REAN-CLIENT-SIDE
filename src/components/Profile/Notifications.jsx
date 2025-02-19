import React from "react";
import { 
  FaTrash, FaEnvelope, FaCheckCircle, 
  FaExclamationTriangle, FaInfoCircle 
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const Notifications = ({ notifications, onDelete }) => {
  // Notification Status Types
  const statusStyles = {
    Success: { icon: <FaCheckCircle size={18} />, textColor: "text-green-700", borderColor: "border-green-300", bgColor: "bg-green-50" },
    Warning: { icon: <FaExclamationTriangle size={18} />, textColor: "text-yellow-700", borderColor: "border-yellow-300", bgColor: "bg-yellow-50" },
    Failed: { icon: <FaExclamationTriangle size={18} />, textColor: "text-red-700", borderColor: "border-red-300", bgColor: "bg-red-50" },
    Info: { icon: <FaInfoCircle size={18} />, textColor: "text-blue-700", borderColor: "border-blue-300", bgColor: "bg-blue-50" },
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-6">
        <FaEnvelope size={25} className="text-indigo-600" /> Notifications
      </h2>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((note) => {
            const status = statusStyles[note.status] || statusStyles.Info;

            return (
              <div
                key={note._id}
                className={`flex items-start justify-between border ${status.borderColor} ${status.bgColor} rounded-md p-4 hover:shadow-md transition-all duration-300 relative`}
              >
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  <div className={`p-3 rounded-full ${status.textColor} bg-opacity-20`}>
                    {status.icon}
                  </div>
                  <div>
                    {/* Title & Content */}
                    <h3 className={`text-lg font-semibold ${status.textColor}`}>
                      {note.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{note.content}</p>

                    {/* Timestamp */}
                    <span className="text-gray-500 text-sm block mt-2">
                      {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                {/* <button
                  onClick={() => onDelete(note._id)}
                  className="text-red-500 hover:text-red-700 transition ml-2"
                  title="Delete Notification"
                >
                  <FaTrash size={18} />
                </button> */}
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
