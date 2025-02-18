import React, { useEffect, useState } from "react";
import { FaBell, FaTrash } from "react-icons/fa";
import { getNotifications, deleteNotification } from "../../services/admins/notificationService";
import AdminLayout from "../../layouts/AdminLayout";
import { format } from "date-fns";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      showMessage("Failed to fetch notifications", "error");
    }
  };

  const openDeleteModal = (notificationId) => {
    setSelectedNotificationId(notificationId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNotificationId(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!selectedNotificationId) return;
    try {
      await deleteNotification(selectedNotificationId);
      fetchNotifications();
      showMessage("Notification deleted successfully!", "success");
      closeModal();
    } catch (error) {
      console.error("Error deleting notification:", error);
      showMessage("Failed to delete notification", "error");
    }
  };

  const renderStatusBadge = (status) => {
    const colorMap = {
      Success: "border-green-500 text-green-600",
      Warning: "border-yellow-500 text-yellow-600",
      Failed: "border-red-500 text-red-600",
      Info: "border-blue-500 text-blue-600",
    };
    return (
      <span
        className={`px-3 py-1 text-sm border rounded-full ${colorMap[status]} hover:bg-opacity-20 transition duration-300`}
      >
        {status}
      </span>
    );
  };

  const renderTypeBadge = (type) => {
    const colorMap = {
      System: "bg-indigo-100 text-indigo-700",
      User: "bg-green-100 text-green-700",
      Promotion: "bg-yellow-100 text-yellow-700",
    };
    return (
      <span className={`px-3 py-1 rounded-full ${colorMap[type]} font-medium`}>
        {type}
      </span>
    );
  };

  return (
    <AdminLayout selectedNav="notifications">
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-6 text-indigo-700 flex items-center gap-3">
          <FaBell className="text-indigo-600" /> Notification Management
        </h2>

        {/* Notification Banner */}
        {message && (
          <div
            className={`my-2 p-2 text-white  rounded-md transition ${
              messageType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Responsive Notifications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-lg shadow-lg bg-white">
            {/* Table Header */}
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Content</th>
                <th className="py-3 px-4 text-center">Sender Type</th>
                <th className="py-3 px-4 text-center">Receiver Type</th>
                <th className="py-3 px-4 text-center">Type</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Created At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <tr
                    key={notification._id}
                    className="hover:bg-gray-100 transition-all duration-300"
                  >
                    <td className="py-4 px-4 border-b border-gray-200 font-semibold text-gray-800">
                      {notification.title}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-gray-600">
                      {notification.content}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      {notification.senderType}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      {notification.receiverType}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      {renderTypeBadge(notification.type)}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      {renderStatusBadge(notification.status)}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      {format(new Date(notification.createdAt), "dd MMM yyyy, hh:mm a")}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200 text-center">
                      <button
                        onClick={() => openDeleteModal(notification._id)}
                        className="text-red-600 hover:text-red-800 px-3 py-2  transition-all hover:scale-110"
                        title="Delete Notification"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No notifications available.
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
                Are you sure you want to delete this notification? This action cannot be undone.
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

export default Notifications;
