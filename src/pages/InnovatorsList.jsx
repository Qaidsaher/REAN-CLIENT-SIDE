import React, { useState, useEffect } from "react";
import { getInnovators } from "../services/users/innovators";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaFilter } from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const InnovatorsList = () => {
  const [innovators, setInnovators] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInnovators();
  }, []);

  const fetchInnovators = async () => {
    try {
      const data = await getInnovators();
      setInnovators(data);
    } catch (error) {
      console.error("Error fetching innovators:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInnovators = innovators.filter((innovator) =>
    `${innovator.firstName} ${innovator.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <UserLayout selectedPage={"investors"}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovators</h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md mb-6 flex items-center">
          <FaSearch className="absolute left-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for innovators..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-1 focus:outline-none focus:ring-blue-500 border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Innovators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-300 h-40 rounded-lg"
                />
              ))
            : filteredInnovators.map((innovator) => (
                <div
                  key={innovator._id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all flex flex-col items-center text-center"
                >
                  {/* Profile Image */}
                  <img
                    src={
                      innovator.photo
                        ? `http://localhost:5000${innovator.photo}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={innovator.firstName}
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 mb-4"
                  />

                  {/* Innovator Details */}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {innovator.firstName} {innovator.lastName}
                  </h3>
                  <p className="text-gray-600">{innovator.email}</p>

                  {/* View Profile Button */}
                  <Link
                    to={`/innovators/${innovator._id}`}
                    className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    <FaUser />
                    View Profile
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default InnovatorsList;
