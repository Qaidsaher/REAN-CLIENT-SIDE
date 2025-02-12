import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Notification from "../../components/UI/Notification";
import InputField from "../../components/UI/InputField";
import { updateAdmin } from "../../services/authAdmin";

const Settings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("New password and confirm password do not match", "error");
      return;
    }
    try {
      await updateAdminPassword(passwordData);
      showMessage("Password updated successfully", "success");
    } catch (error) {
      console.error("Error updating password:", error);
      showMessage("Error updating password", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"settings"}>
      <div className="p-6 bg-white shadow-md rounded-md pt-16">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <form onSubmit={handlePasswordChange} className="grid grid-cols-2 gap-4">
          <InputField
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          />
          <InputField
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
          <InputField
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
          />
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Settings;
