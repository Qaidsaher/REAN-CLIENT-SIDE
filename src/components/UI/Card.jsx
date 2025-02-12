import React from "react";

const Card = ({ title, description, children }) => {
  return (
    <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-md md:max-w-md">
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
