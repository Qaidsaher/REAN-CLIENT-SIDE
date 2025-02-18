import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({ label, type, name, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4 relative  ">
      {label && <label className="block text-gray-700 font-semibold mb-1" dir="auto">{label}</label>}
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rtl:text-right rtl:text-left px-3 py-2 border rounded-md focus:ring-1 focus:outline-none focus:ring-blue-500 border-gray-300 pr-10 rtl:pr-3 rtl:pl-10"
          dir="auto"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 end-3 flex items-center text-gray-500"
          >
            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1" dir="auto">{error}</p>}
    </div>
  );
};

export default InputField;