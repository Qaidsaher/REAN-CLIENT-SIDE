import React from "react";

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
}) => {
  return (
    <div>
      <label className="block text-gray-700 mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full border  focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg p-3 transition focus:ring-2 focus:ring-indigo-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaField;
