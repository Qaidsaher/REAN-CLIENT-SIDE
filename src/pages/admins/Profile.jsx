import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Notification from "../../components/UI/Notification";
import InputField from "../../components/UI/InputField";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  logout,
} from "../../services/authAdmin";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchProfile();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      showMessage("Error fetching profile", "error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
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

  const handleLogout = async () => {
    try {
      await logout();
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
        <form onSubmit={handleUpdate} className="">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <InputField
                label="Name"
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div>
              <InputField
                label="Email"
                type="email"
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div>
              <InputField
                label="Phone Number"
                type="text"
                value={profile.phone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end ">
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
        <p>when deleting you account it want be reconvery !</p>
        <div className="flex justify-end ">
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-md "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-md my-6">
        <h2 className="text-xl font-bold mb-4">Account Actions</h2>
        <p>when deleting you account it want be reconvery !</p>
        <div className="flex justify-end ">
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md  mb-4"
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
