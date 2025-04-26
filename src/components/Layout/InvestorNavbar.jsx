import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext"; // ✅ Import Auth Context

const InvestorNavbar = () => {
  const { user, logout } = useAuth(); // ✅ Get user & logout function
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ✅ Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-indigo-600">
            REAN
            </NavLink>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { label: "Dashboard", path: "/dashboard-investor" },
              { label: "Innovations", path: "/innovations" },
              { label: "Innovators", path: "/innovators" },
              { label: "Investments", path: "/investments" },
              { label: "My Activities", path: "/my-activity" },
              { label: "Chat", path: "/chat" },
              { label: "help", path: "/help" },
            ].map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
                    : "text-gray-600 hover:text-indigo-600 transition"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* ✅ Profile Dropdown (Hidden on Small Screens) */}
          <div className="hidden md:block relative" ref={profileMenuRef}>
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full shadow-md"
                />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
              <span className="font-medium">{user?.firstName +" "+user?.lastName || "User"}</span>
            </button>

            {/* ✅ Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 transition"
                >
                  Profile
                </NavLink>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white shadow-md">
          {[
            { label: "Dashboard", path: "/dashboard-investor" },
            { label: "Innovations", path: "/innovations" },
            { label: "Innovators", path: "/innovators" },
            { label: "Investments", path: "/investments" },
            { label: "My Activities", path: "/my-activity" },
            { label: "Chat", path: "/chat" },
            { label: "help", path: "/help" },
          ].map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
            >
              {item.label}
            </NavLink>
          ))}

          {/* ✅ Profile & Logout in Mobile Menu */}
          <div className="border-t border-gray-200">
            <NavLink
              to="/profile"
              className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
            >
              Profile
            </NavLink>
            <button
              onClick={logout}
              className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default InvestorNavbar;
