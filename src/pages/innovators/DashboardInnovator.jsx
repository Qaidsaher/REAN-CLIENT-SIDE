import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const DashboardInnovator = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800">Innovator Dashboard</h1>

        <div className="mt-4">
          <p className="text-gray-700"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="mt-6 space-y-3">
          <Link to="/innovator/innovations" className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Manage Innovations
          </Link>
          <Link to="/innovator/investments" className="block w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            View Investments
          </Link>
          <Link to="/innovator/chats" className="block w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition">
            View Chats
          </Link>
          <button onClick={() => { logout(); navigate("/login"); }} className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardInnovator;
