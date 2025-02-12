import React from "react";
import { useTranslation } from "react-i18next";
import { FaCommentDots } from "react-icons/fa"; // ✅ Modern Chat Icon
import { NavLink } from "react-router-dom";

const FloatingButton = () => {
  const { t, i18n } = useTranslation();

  return (
    <NavLink
      to="/help"
      className={`fixed bottom-8 ${i18n.language === "en" ? "left-8" : "right-8"} 
        w-14 h-14 flex justify-center items-center bg-white shadow-lg 
        rounded-full text-indigo-600 hover:bg-indigo-100 hover:shadow-xl 
        transition-all transform hover:scale-110`}
    >
      <FaCommentDots size={28} />
    </NavLink>
  );
};

export default FloatingButton;
