import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../../services/admins/notificationService";
import AdminLayout from "../../layouts/AdminLayout";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      showMessage("Error fetching notifications", "error");
    }
  };

  const handleCreate = async (newNotification) => {
    try {
      await createNotification(newNotification);
      fetchNotifications();
      showMessage("Notification created successfully", "success");
    } catch (error) {
      console.error("Error creating notification:", error);
      showMessage("Error creating notification", "error");
    }
  };

  const handleEdit = async (updatedNotification) => {
    try {
      await updateNotification(updatedNotification._id, updatedNotification);
      fetchNotifications();
      showMessage("Notification updated successfully", "success");
    } catch (error) {
      console.error("Error updating notification:", error);
      showMessage("Error updating notification", "error");
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      fetchNotifications();
      showMessage("Notification deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting notification:", error);
      showMessage("Error deleting notification", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"notifications"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Notifications</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={notifications}
          fields={["name", "content", "type"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Notifications;
