import React, { useEffect, useState } from "react";
import Navbar from "../components/Innovator/Navbar";
import ProfileView from "../components/Innovator/Profile/ProfileView";
import EditProfile from "../components/Innovator/Profile/EditProfile";
import Settings from "../components/Innovator/Profile/Settings";
import Notifications from "../components/Innovator/Profile/Notifications";
import Footer from "../components/Innovator/Footer";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaEdit, FaCog, FaBell } from "react-icons/fa";

import {
  getProfile,
  editProfile,
  changePassword,
  deleteAccount,
} from "../services/users/chatServices"; // API services
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

  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New Message",
      description: "You received a message from John.",
      date: "2025-02-10",
    },
    {
      id: 2,
      type: "success",
      title: "Profile Updated",
      description: "Your profile was updated successfully.",
      date: "2025-02-09",
    },
    {
      id: 3,
      type: "alert",
      title: "Security Alert",
      description: "New sign-in detected from an unknown device.",
      date: "2025-02-08",
    },
  ]);

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

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500">Loading profile...</p>;
    }
    if (!profile) {
      return (
        <p className="text-center text-red-500">Failed to load profile.</p>
      );
    }

    switch (activeTab) {
      case "overview":
        return <ProfileView profile={profile} role={role} stats={stats} />;
      case "edit":
        return <EditProfile profile={profile} updateProfile={() => {}} />;
      case "settings":
        return <Settings changePassword={() => {}} deleteAccount={() => {}} />;
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
    <UserLayout  selectedPage="profile">
      <div className="flex flex-col md:flex-row gap-8 min-h-[90vh] bg-red-40">
        {/* ✅ Sidebar Navigation */}
        <nav className="w-full md:w-1/4 bg-white shadow-md rounded-md p-6 md:min-h-[90vh]">
          <ul className="space-y-3">
            {[
              {
                label: "Overview",
                icon: <FaUser size={18} />,
                key: "overview",
              },
              {
                label: "Edit Profile",
                icon: <FaEdit size={18} />,
                key: "edit",
              },
              {
                label: "Settings",
                icon: <FaCog size={18} />,
                key: "settings",
              },
              {
                label: "Notifications",
                icon: <FaBell size={18} />,
                key: "notifications",
              },
            ].map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-3 w-full text-left font-semibold px-5 py-3 rounded-lg border transition-all duration-200 ${
                    activeTab === item.key
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
        <main className="w-full md:w-3/4 bg-white shadow-md rounded-md p-6 md:min-h-[90vh]">
          {renderContent()}
        </main>
      </div>
    </UserLayout>
  );
};

export default Profile;
