import React, { useEffect, useState } from "react";
import { getInvestors } from "../services/websiteService"
import {
  FaSearch,
  FaBuilding,
  FaUserTie,
  FaFilter,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

const InvestorsList = () => {
  const [investors, setInvestors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      const data = await getInvestors();
      setInvestors(data);
    } catch (error) {
      console.error("❌ Error fetching investors:", error);
      setError("Failed to load investors.");
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      investor.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany =
      selectedCompany === "" ||
      (investor.company && investor.company === selectedCompany);

    const matchesInvestment =
      investmentRange === "" || investor.investmentAmount >= investmentRange;

    return matchesSearch && matchesCompany && matchesInvestment;
  });

  // Extract unique company names for filtering
  const uniqueCompanies = [
    ...new Set(investors.map((investor) => investor.company)),
  ];

  return (
    <UserLayout selectedPage={"investors"}>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-indigo-600 mb-6 ">
          🌟 Investors
        </h2>

        {/* Search & Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Company Filter */}
          <div className="relative w-full md:w-1/4">
            <FaBuilding className="absolute left-3 top-3 text-gray-500" />
            <select
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">All Companies</option>
              {uniqueCompanies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          {/* Investment Range Filter */}
          <div className="relative w-full md:w-1/4">
            <FaDollarSign className="absolute left-3 top-3 text-gray-500" />
            <select
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500"
              value={investmentRange}
              onChange={(e) => setInvestmentRange(e.target.value)}
            >
              <option value="">All Investments</option>
              <option value="5000">Above $5,000</option>
              <option value="10000">Above $10,000</option>
              <option value="50000">Above $50,000</option>
            </select>
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-lg bg-gray-300 h-40 w-80"></div>
              <div className="rounded-lg bg-gray-300 h-40 w-80"></div>
              <div className="rounded-lg bg-gray-300 h-40 w-80"></div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {filteredInvestors.length === 0 && !loading && (
          <p className="text-gray-600 text-center">No investors found.</p>
        )}

        {/* Investors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestors.map((investor) => (
            <div
              key={investor._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              {/* Investor Info */}
              <div className="flex items-center gap-4">
                <img
                  src={investor.photo || "https://via.placeholder.com/150"}
                  alt={investor.firstName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {investor.firstName} {investor.lastName}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-1">
                    <FaBuilding className="text-blue-600" />
                    {investor.company || "Independent Investor"}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <FaDollarSign className="text-green-600" />
                    Investment: ${investor.investmentAmount || "N/A"}
                  </p>
                </div>
              </div>

              {/* View Profile Button */}
              <Link
                to={`/investors/${investor._id}`}
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

export default InvestorsList;
