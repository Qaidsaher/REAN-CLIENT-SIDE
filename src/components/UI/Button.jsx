import React from "react";

const Button = ({ text, onClick, type = "button", variant = "primary", disabled }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition duration-300 flex items-center justify-center";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    indigo: "bg-indigo-600 text-white hover:bg-indigo-700", // ✅ Added Indigo Theme
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
