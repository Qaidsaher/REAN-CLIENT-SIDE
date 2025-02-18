import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = ({ selectedPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // ✅ Close menus when clicking outside
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
          <NavLink to="/" className="text-2xl font-bold text-indigo-600">
            REAN
          </NavLink>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { label: "Home", path: "/" },
              { label: "Innovations", path: "/innovations" },
              { label: "About Us", path: "/about-us" },
              { label: "Help", path: "/help" },
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

            <div className="flex">
              <NavLink
                to="/login"
                className="px-4 py-1 border-2 border-indigo-500 text-gray-700 rounded-md shadow-md transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:border-indigo-600"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="ml-4 px-4 py-1 border-2 border-green-500 text-gray-700 rounded-md shadow-md transition-all duration-300 hover:bg-green-500 hover:text-white hover:border-green-600"
              >
                Join
              </NavLink>
            </div>


            {/* ✅ Dropdown Menu */}

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
            { label: "Home", path: "/" },
            { label: "Innovations", path: "/innovations" },
            { label: "About Us", path: "/about-us" },
            { label: "Help", path: "/help" },
          ].map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
            >
              {item.label}
            </NavLink>
          ))}

          {/* ✅ Login & Join in Mobile Menu */}
          <div className="border-t border-gray-200">
            <NavLink
              to="/login"
              className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
            >
              Join
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
// import React, { useState, useRef, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// const Navbar = ({ selectedPage }) => {
//   const { t, i18n } = useTranslation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const profileMenuRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   // ✅ Close menus when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setIsProfileMenuOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const switchLanguage = () => {
//     i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
//   };

//   return (
//     <nav className="bg-white shadow-md fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex justify-between items-center h-16">
//           {/* ✅ Logo */}
//           <NavLink to="/" className="text-2xl font-bold text-indigo-600">
//             REAN
//           </NavLink>

//           {/* ✅ Desktop Navigation */}
//           <div className="hidden md:flex space-x-6">
//             {[
//               { label: t("home"), path: "/" },
//               { label: t("innovate"), path: "/innovate" },
//               { label: t("about"), path: "/about" },
//               { label: t("contact"), path: "/contact" },
//             ].map((item, idx) => (
//               <NavLink
//                 key={idx}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
//                     : "text-gray-600 hover:text-indigo-600 transition"
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* ✅ Language Switch Button */}
//           <button
//             onClick={switchLanguage}
//             className="hidden md:block text-sm text-gray-700 hover:text-indigo-600 ml-4"
//           >
//             {t("switchLanguage")}
//           </button>

//           {/* ✅ Profile Dropdown (Hidden on Small Screens) */}
//           <div className="hidden md:block relative" ref={profileMenuRef}>
//             <button
//               className="text-gray-600 hover:text-indigo-600 transition text-2xl"
//               onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//             >
//               <FaUserCircle />
//             </button>

//             {/* ✅ Dropdown Menu */}
//             {isProfileMenuOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
//                 <NavLink
//                   to="/login"
//                   className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 transition"
//                 >
//                   {t("login")}
//                 </NavLink>
//                 <NavLink
//                   to="/register"
//                   className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 transition"
//                 >
//                   {t("join")}
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* ✅ Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden text-gray-600 text-2xl focus:outline-none"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* ✅ Mobile Navigation Menu */}
//       {isMobileMenuOpen && (
//         <div ref={mobileMenuRef} className="md:hidden bg-white shadow-md">
//           {[
//             { label: t("home"), path: "/" },
//             { label: t("innovate"), path: "/innovate" },
//             { label: t("about"), path: "/about" },
//             { label: t("contact"), path: "/contact" },
//           ].map((item, idx) => (
//             <NavLink
//               key={idx}
//               to={item.path}
//               className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
//             >
//               {item.label}
//             </NavLink>
//           ))}

//           {/* ✅ Login & Join in Mobile Menu */}
//           <div className="border-t border-gray-200">
//             <NavLink
//               to="/login"
//               className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
//             >
//               {t("login")}
//             </NavLink>
//             <NavLink
//               to="/register"
//               className="block px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
//             >
//               {t("join")}
//             </NavLink>
//           </div>

//           {/* ✅ Language Switch Button in Mobile Menu */}
//           <button
//             onClick={switchLanguage}
//             className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-indigo-100 transition"
//           >
//             {t("switchLanguage")}
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

