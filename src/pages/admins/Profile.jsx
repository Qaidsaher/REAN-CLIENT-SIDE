import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Notification from "../../components/UI/Notification";
import InputField from "../../components/UI/InputField";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the path as needed

const Profile = () => {
  const { profile, updateAdminProfile, deleteAccount, logout } = useAuth();
  // Use a local state copy to allow editing before submitting
  const [localProfile, setLocalProfile] = useState(profile || {});
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Whenever the context profile changes, update the local copy.
  useEffect(() => {
    setLocalProfile(profile || {});
  }, [profile]);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Call the updateAdminProfile function from the context.
      await updateAdminProfile(localProfile.name, localProfile.email);
      showMessage("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showMessage("Error updating profile", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      showMessage("Account deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting account:", error);
      showMessage("Error deleting account", "error");
    }
  };

  const handleLogout = () => {
    try {
      logout();
      showMessage("Logged out successfully", "success");
    } catch (error) {
      console.error("Error logging out:", error);
      showMessage("Error logging out", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"profile"}>
      <div className="p-6 bg-white shadow-md rounded-md my-6">
        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <InputField
                label="Name"
                value={localProfile.name || ""}
                onChange={(e) =>
                  setLocalProfile({ ...localProfile, name: e.target.value })
                }
              />
            </div>
            <div>
              <InputField
                label="Email"
                type="email"
                value={localProfile.email || ""}
                onChange={(e) =>
                  setLocalProfile({ ...localProfile, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <div className="p-6 bg-white shadow-md rounded-md my-6">
        <h2 className="text-xl font-bold mb-4">Account Actions</h2>
        <p>When deleting your account, it cannot be recovered!</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="p-6 bg-white shadow-md rounded-md my-6">
        <h2 className="text-xl font-bold mb-4">Account Actions</h2>
        <p>When deleting your account, it cannot be recovered!</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
      <Notification
        message={message}
        messageType={messageType}
        onClose={() => setMessage(null)}
      />
    </AdminLayout>
  );
};

export default Profile;
