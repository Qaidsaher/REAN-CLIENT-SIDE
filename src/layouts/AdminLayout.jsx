import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaShapes,
  FaComments,
  FaLightbulb,
  FaUsers,
  FaMoneyBill,
  FaUserTie,
  FaBell,
  FaUserShield,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = ({ children, selectedNav }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Toggle Profile Menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close Profile Menu
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      // Close Sidebar (Only on small screens)
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 1024
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen, sidebarOpen]);

  // Adjust sidebar visibility on screen resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 w-screen">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-indigo-700 text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:relative md:translate-x-0 md:w-64`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-indigo-500">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <button
            className="text-gray-300 md:hidden hover:text-white"
            onClick={toggleSidebar}
          >
            ✖
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <SidebarItem
              to="/admin/categories"
              icon={<FaShapes />}
              label="Categories"
              selected={selectedNav === "categories"}
            />
            <SidebarItem
              to="/admin/chatting"
              icon={<FaComments />}
              label="Chatting"
              selected={selectedNav === "chatting"}
            />
            <SidebarItem
              to="/admin/innovations"
              icon={<FaLightbulb />}
              label="Innovations"
              selected={selectedNav === "innovations"}
            />
            <SidebarItem
              to="/admin/innovators"
              icon={<FaUsers />}
              label="Innovators"
              selected={selectedNav === "innovators"}
            />
            <SidebarItem
              to="/admin/investments"
              icon={<FaMoneyBill />}
              label="Investments"
              selected={selectedNav === "investments"}
            />
            <SidebarItem
              to="/admin/investors"
              icon={<FaUserTie />}
              label="Investors"
              selected={selectedNav === "investors"}
            />
            <SidebarItem
              to="/admin/notifications"
              icon={<FaBell />}
              label="Notifications"
              selected={selectedNav === "notifications"}
            />
            <SidebarItem
              to="/admin/admins"
              icon={<FaUserShield />}
              label="Admins"
              selected={selectedNav === "admins"}
            />
            <SidebarItem
              to="/admin/settings"
              icon={<FaCog />}
              label="Settings"
              selected={selectedNav === "settings"}
            />
            <SidebarItem
              to="/admin/profile"
              icon={<FaUser />}
              label="Profile"
              selected={selectedNav === "profile"}
            />
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        {/* Navbar */}
        <header className="bg-indigo-100 shadow-md h-16 flex items-center justify-between px-6 md:px-10 relative">
          <button
            className="text-indigo-700 md:hidden focus:outline-none hover:scale-110 transition"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-indigo-700">
            Admin Dashboard
          </h1>
          {/* User Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center space-x-2 text-indigo-700 font-semibold hover:text-indigo-900"
              onClick={toggleMenu}
            >
              <FaUser className="text-lg" />
              <span>{user?.name || "Admin"}</span>
              <FaChevronDown className="text-sm" />
            </button>
            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaUser className="mr-2" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FaCog className="mr-2" /> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-indigo-100"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Overlay (Only for small screens) */}
        {sidebarOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black opacity-50 transition-all duration-300 ease-in-out"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-indigo-700 text-white text-center p-4">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label, selected }) => {
  return (
    <li>
      <Link
        to={to}
        className={`block px-6 py-3 flex items-center space-x-3 transition duration-300 hover:bg-indigo-600 hover:pl-8 ${
          selected ? "bg-indigo-800" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default AdminLayout;
