
import React, { useEffect, useState } from "react";
import ProfileView from "../components/Profile/ProfileView";
import EditProfile from "../components/Profile/EditProfile";
import Settings from "../components/Profile/Settings";
import Notifications from "../components/Profile/Notifications";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaEdit, FaCog, FaBell } from "react-icons/fa";
import Notification from "../components/UI/Notification";

import {
  getProfile,
  getNotifications,
  editProfile,

} from "../services/profileServices"; // API services
import UserLayout from "../layouts/UserLayout";

const Profile = () => {
  const stats = {
    notifications: 10,
    chats: 5,
    innovations: 3,
    investments: 2,
    commitments: 4,
    investorsChatted: 6,
  };
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };
  const { user, role, changePassword, deleteAccount } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // ✅ Fetch Profile Data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData.user);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  // ✅ Fetch Notifications Data for the logged in user
  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const data = await getNotifications();
        if (data) {
          setNotifications(data);
        } else {
          showMessage("Error fetching notifications:" + error)
          // console.error("Error fetching notifications:", .error);
        }
      } catch (error) {
        console.error("❌ Error fetching notifications:", error);
      }
    };
    if (user) {
      fetchUserNotifications();
    }
  }, [user]);

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  const handleEditProfile = async (updatedProfile) => {
    try {
      const response = await editProfile(updatedProfile);
      const profileData = await getProfile();
      setProfile(profileData.user);

      showMessage("Profile updated successfully")
      // alert("Profile updated successfully.");

    } catch (error) {
      showMessage("Failed to update profile:" + error, "error")
    }
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      const response = await changePassword({ oldPassword, newPassword });
      if (response.success) {
        showMessage("Password changed successfully")
        // alert("Password changed successfully.");
      } else {
        // alert("Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showMessage("Error changing password::" + error, "error")
    }
  };

  const handleDeleteAccount = async () => {

    try {
      const response = await deleteAccount();
      if (response.success) {
        // alert("Account deleted successfully.");
        window.location.href = "/login";
      } else {
        // alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);

    }
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading profile...</p>;
    }
    if (!profile) {
      return <p className="text-center text-red-500">Failed to load profile.</p>;
    }

    switch (activeTab) {
      case "overview":
        return <ProfileView profile={profile} role={role} stats={stats} />;
      case "edit":
        return <EditProfile profile={profile} updateProfile={handleEditProfile} />;
      case "settings":
        return <Settings changePassword={handleChangePassword} deleteAccount={handleDeleteAccount} />;
      case "notifications":
        return (
          <Notifications
            notifications={notifications}
            onDelete={handleDeleteNotification}
          />
        );
      default:
        return <ProfileView profile={profile} stats={stats} />;
    }
  };

  return (
    <UserLayout selectedPage="profile">
      <div className="flex flex-col md:flex-row gap-8 min-h-[90vh]">
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        {/* ✅ Sidebar Navigation */}
        <nav className="w-full md:w-1/4 bg-white shadow-md rounded-md p-6 md:min-h-[90vh]">
          <ul className="space-y-3">
            {[
              { label: "Overview", icon: <FaUser size={18} />, key: "overview" },
              { label: "Edit Profile", icon: <FaEdit size={18} />, key: "edit" },
              { label: "Settings", icon: <FaCog size={18} />, key: "settings" },
              { label: "Notifications", icon: <FaBell size={18} />, key: "notifications" },
            ].map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-3 w-full text-left font-semibold px-5 py-3 rounded-lg border transition-all duration-200 ${activeTab === item.key
                    ? "border-indigo-600 text-indigo-600 bg-gray-100 shadow-md"
                    : "border-transparent text-gray-800 hover:border-indigo-400 hover:bg-indigo-100 hover:shadow-md"
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✅ Main Content Area */}
        <main className="w-full md:w-3/4 bg-white shadow-md rounded-md p-6">
          {renderContent()}
        </main>
      </div>
    </UserLayout>
  );
};

export default Profile;