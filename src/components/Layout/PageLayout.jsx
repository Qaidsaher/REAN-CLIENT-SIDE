import React from "react";

const PageLayout = ({ title, children }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout;
