import React from "react";
import {
  FaUser,
  FaBriefcase,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPhone,
  FaBirthdayCake,
  FaQuoteLeft,
  FaBell,
  FaComments,
  FaLightbulb,
  FaChartLine,
  FaHandshake,
  FaUsers,
} from "react-icons/fa";

const ProfileView = ({ profile, role, stats }) => {
  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 border-b border-indigo-400 my-4 pb-6">
        {/* Profile Image */}
        <div className="relative group">
          <img
            src={
              profile.photo
                ? "http://localhost:5000" + profile.photo
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-600 shadow-lg transition-all duration-300 hover:scale-105"
          />
        </div>

        {/* Profile Info with User Type Badge */}
        <div className="text-center md:text-left flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-lg text-gray-600">{profile.email}</p>

          {/* User Type Badge */}
          <div className="mt-2 flex items-center justify-center md:justify-start">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md ${
                role === "investor"
                  ? "bg-green-100 text-green-600 border border-green-400"
                  : "bg-blue-100 text-blue-600 border border-blue-400"
              }`}
            >
              {role === "investor" ? (
                <>
                  <FaBriefcase size={16} /> Investor
                </>
              ) : (
                <>
                  <FaUser size={16} /> Innovator
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-600" />
            <span className="font-semibold text-gray-800">City:</span>{" "}
            {profile.city || "N/A"}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaGraduationCap className="text-indigo-600" />
            <span className="font-semibold text-gray-800">Education:</span>{" "}
            {profile.education || "N/A"}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-700 flex items-center gap-2">
            <FaPhone className="text-indigo-600" />
            <span className="font-semibold text-gray-800">Phone:</span>{" "}
            {profile.phone || "N/A"}
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <FaBirthdayCake className="text-indigo-600" />
            <span className="font-semibold text-gray-800">Birthday:</span>{" "}
            {profile.birthday ? profile.birthday.split("T")[0] : "N/A"}
          </p>
        </div>
      </div>

      {/* ✅ Bio Section - Modern Design */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaQuoteLeft className="text-indigo-600" /> Bio
        </h3>
        <p className="text-gray-700 mt-3 text-lg leading-relaxed">
          {profile.bio || "No bio available. Add some details about yourself!"}
        </p>
      </div>

      {/* ✅ Statistics Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {stats && (
          <>
            {/* Notifications Card */}
            <div className="border border-indigo-300 bg-indigo-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <FaBell size={30} className="text-indigo-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Notifications
              </h3>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {stats.notifications}
              </p>
            </div>

            {/* Messages Card */}
            <div className="border border-blue-300 bg-blue-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <FaComments size={30} className="text-blue-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">Chats</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.chats}
              </p>
            </div>

            {/* Innovations Card */}
            <div className="border border-green-300 bg-green-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <FaLightbulb size={30} className="text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Innovations
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.innovations}
              </p>
            </div>

            {/* Investments Card */}
            <div className="border border-yellow-300 bg-yellow-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <FaChartLine size={30} className="text-yellow-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Investments
              </h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.investments}
              </p>
            </div>

            {/* Commitments Card */}
            <div className="border border-purple-300 bg-purple-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <FaHandshake size={30} className="text-purple-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Commitments
              </h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.commitments}
              </p>
            </div>

            {/* Investors Chatting with User */}
            <div className="border border-red-300 bg-red-100 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all">
              <FaUsers size={30} className="text-red-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">
                Investors in Chat
              </h3>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.investorsChatted}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
