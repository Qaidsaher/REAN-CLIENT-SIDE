import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-6 text-lg font-bold">Admin Panel</div>
      <nav>
        <ul>
          <li className="p-3 hover:bg-gray-700">
            <Link to="/admin-dashboard" className="flex items-center space-x-2">
              <FaHome /> <span>Dashboard</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-gray-700">
            <Link to="/admin/users" className="flex items-center space-x-2">
              <FaUser /> <span>Manage Users</span>
            </Link>
          </li>
          <li className="p-3 hover:bg-gray-700">
            <Link to="/admin/settings" className="flex items-center space-x-2">
              <FaCog /> <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
