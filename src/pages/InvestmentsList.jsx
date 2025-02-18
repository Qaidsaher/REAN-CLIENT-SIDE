import React, { useEffect, useState } from "react";
import { getInvestments } from "../services/websiteService";
import { Link } from "react-router-dom";
import { FaSearch, FaDollarSign, FaUserTie, FaLightbulb } from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const InvestmentsList = () => {
  const [investments, setInvestments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const data = await getInvestments();
      setInvestments(data);
    } catch (error) {
      console.error("❌ Error fetching investments:", error);
      setError("Failed to load investments.");
    } finally {
      setLoading(false);
    }
  };

  const filteredInvestments = investments.filter((investment) =>
    investment.innovation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <UserLayout selectedPage={"investments"}>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          💰 Investments
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-2/3 mx-auto mb-6">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search investments by innovation..."
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-1 focus:outline-none focus:ring-blue-500 border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading & Error States */}
        {loading && (
          <p className="text-gray-600 text-center">Loading investments...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {filteredInvestments.length === 0 && !loading && (
          <p className="text-gray-600 text-center">No investments found.</p>
        )}

        {/* Investments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestments.map((investment) => (
            <div
              key={investment._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {investment.innovation.name}
              </h3>
              <p className="text-gray-600 mt-1">
                {investment.innovation.description.substring(0, 80)}...
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaDollarSign className="text-green-600" /> Amount: $
                {investment.amount}
              </p>

              {/* View Details Button */}
              <Link
                to={`/investments/${investment._id}`}
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default InvestmentsList;
