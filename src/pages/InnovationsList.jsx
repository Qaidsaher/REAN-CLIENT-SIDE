import React, { useState, useEffect } from "react";
import { getInnovations, getCategories } from "../services/websiteService"
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const InnovationsList = () => {
  const [innovations, setInnovations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInnovations();
    fetchCategories();
  }, []);

  const fetchInnovations = async () => {
    try {
      setLoading(true);
      const data = await getInnovations();
      setInnovations(data);
    } catch (error) {
      console.error("❌ Error fetching innovations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  const filteredInnovations = innovations.filter((innovation) => {
    return (
      innovation.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || innovation.category._id === selectedCategory)
    );
  });

  return (
    <UserLayout selectedPage={"innovations"}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovations</h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-2/3">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search for innovations..."
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative mt-4 md:mt-0 w-full md:w-1/3">
            <FaFilter className="absolute left-3 top-3 text-gray-500" />
            <select
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 transition"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Innovations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded-lg p-4 shadow-md h-72"
              ></div>
            ))
          ) : filteredInnovations.length > 0 ? (
            filteredInnovations.map((innovation) => (
              <div
                key={innovation._id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all"
              >
                {/* Innovation Image */}
                <img
                  src={innovation.image ? innovation.image : "https://via.placeholder.com/300"}
                  alt={innovation.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />


                {/* Innovation Details */}
                <h3 className="text-xl font-semibold text-gray-900">
                  {innovation.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  {innovation.description.substring(0, 100)}...
                </p>
                <p className="text-gray-700 mt-2 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />{" "}
                  <span className="font-semibold">${innovation.cost}</span>
                </p>

                {/* Innovator Profile Preview */}
                <div className="mt-3 flex items-center space-x-3">
                  <img
                    src={
                      innovation.createdBy.photo
                        ? `${innovation.createdBy.photo}`
                        : "https://via.placeholder.com/40"
                    }
                    alt="Innovator"
                    className="w-10 h-10 rounded-full border-2 border-indigo-500"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {innovation.createdBy.firstName}{" "}
                      {innovation.createdBy.lastName}
                    </p>
                    <p className="text-xs text-gray-500">Innovator</p>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/innovations/${innovation._id}`}
                  className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  <FaEye />
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">
              No innovations found.
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default InnovationsList;
