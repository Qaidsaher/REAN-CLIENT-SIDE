import React, { useEffect, useState } from "react";
import { getInnovations, deleteInnovation } from "../../../services/admins/innovationService";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDollarSign,
  FaLightbulb,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import AdminLayout from "../../../layouts/AdminLayout";
// import UserLayout from "../../layouts/UserLayout";

const Innovations = () => {
  const [innovations, setInnovations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // New Status Filter
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInnovations();
  }, []);

  const fetchInnovations = async () => {
    try {
      const data = await getInnovations();
      setInnovations(data);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.map((innovation) => innovation.category.name)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching innovations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this innovation?")) {
      try {
        await deleteInnovation(id);
        fetchInnovations();
      } catch (error) {
        console.error("Error deleting innovation:", error);
      }
    }
  };

  // Status icons for different innovation states
  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <FaCheckCircle className="text-green-600" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  // Apply Filters
  const filteredInnovations = innovations.filter(
    (innovation) =>
      innovation.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "" || innovation.category.name === categoryFilter) &&
      (statusFilter === "" || innovation.status === statusFilter)
  );

  return (
    <AdminLayout selectedNav={"innovations"}>

      <div className=" p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-indigo-600">Innovations</h2>
          <Link
            to="/admin/innovations/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition"
          >
            <FaPlus className="mr-2" /> Add Innovation
          </Link>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {/* Search Bar */}
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by innovation name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 border-gray-300"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full">
            <FaFilter className="absolute left-3 top-3 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 border-gray-300"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative w-full">
            <FaFilter className="absolute left-3 top-3 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 border-gray-300"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Loading Shimmer Effect */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-gray-300 h-40 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredInnovations.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No innovations found.
              </p>
            ) : (
              filteredInnovations.map((innovation) => (
                <motion.div
                  key={innovation._id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FaLightbulb className="text-yellow-500" />{" "}
                    {innovation.name}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {innovation.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaDollarSign className="text-green-600" />
                      <span className="font-semibold">Cost:</span> $
                      {innovation.cost}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <FaFilter className="text-indigo-600" />
                      <span className="font-semibold">Category:</span>{" "}
                      {innovation.category.name}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-700 flex items-center gap-2">
                      {getStatusIcon(innovation.status)}
                      <span className="font-semibold">{innovation.status}</span>
                    </div>
                    <div className="flex space-x-3">
                      {/* ✅ New View Details Icon */}
                      <Link
                        to={`/admin/innovations/${innovation._id}`}
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        <FaEye size={20} />
                      </Link>

                      <Link
                        to={`/admin/innovations/edit/${innovation._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(innovation._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Innovations;
