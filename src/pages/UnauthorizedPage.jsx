import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="max-w-lg pt-26 mx-auto bg-white shadow-md rounded p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600">Unauthorized Access</h2>
      <p className="text-gray-700 mt-2">You do not have permission to view this page.</p>
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Go Back
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
