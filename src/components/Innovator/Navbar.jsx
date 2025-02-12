import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ✅ Close the profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
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
            <span className="text-2xl font-bold text-indigo-600">Innovator</span>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { label: "Dashboard", path: "/" },
              { label: "Profile", path: "/profile" },
              { label: "Innovations", path: "/innovations" },
              { label: "Chat", path: "/chat" },
              { label: "Investments", path: "/investments" },
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
              className="text-gray-600 hover:text-indigo-600 transition text-2xl"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <FaUserCircle />
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
            { label: "Dashboard", path: "/" },
            { label: "Profile", path: "/profile" },
            { label: "Innovations", path: "/innovations" },
            { label: "Chat", path: "/chat" },
            { label: "Investments", path: "/investments" },
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
            <button className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-red-100 transition">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
