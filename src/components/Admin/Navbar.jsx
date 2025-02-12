// src/components/Admin/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-red-600">Admin Panel</span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-600 hover:text-red-600"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/investors"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-600 hover:text-red-600"
              }
            >
              Investors
            </NavLink>
            <NavLink
              to="/admin/innovators"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-600 hover:text-red-600"
              }
            >
              Innovators
            </NavLink>
            <NavLink
              to="/admin/innovations"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-600 hover:text-red-600"
              }
            >
              Innovations
            </NavLink>
            <NavLink
              to="/admin/notifications"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-gray-600 hover:text-red-600"
              }
            >
              Notifications
            </NavLink>
          </div>
          {/* Logout Button */}
          <div>
            <button className="text-gray-600 hover:text-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
