import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getInnovationById } from "../../services/users/innovations";
import {
  FaDollarSign,
  FaUserTie,
  FaLightbulb,
  FaComments,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaPlayCircle,
  FaImage,
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import UserLayout from "../../layouts/UserLayout";

const ShowInnovation = () => {
  const { id } = useParams();
  const [innovation, setInnovation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInnovation();
  }, []);

  const fetchInnovation = async () => {
    try {
      const data = await getInnovationById(id);
      setInnovation(data);
    } catch (error) {
      console.error("❌ Error fetching innovation details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading innovation details...</p>
    );
  }

  if (!innovation) {
    return <p className="text-center text-red-500">Innovation not found.</p>;
  }

  return (
    <UserLayout selectedPage={"my-ideas"}>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6 mb-6"
        >
          {/* Media Preview (Video and Image Side by Side) */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video Preview */}
            {innovation.video && (
              <div className="relative">
                <video
                  controls
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                  src={`${innovation.video}`}
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
                  <FaPlayCircle /> Video
                </div>
              </div>
            )}
           

            {/* Image Preview */}
            {innovation.image && (
              <div className="relative">
                <img
                  src={innovation.image}
                  alt={innovation.name}
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
                  <FaImage /> Image
                </div>
              </div>
            )}
          </div>

          {/* Innovation Info */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900">
              {innovation.name}
            </h2>
            <p className="text-gray-600 mt-2">{innovation.description}</p>

            {/* Status */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md bg-gray-100">
              {innovation.status === "Approved" ? (
                <FaCheckCircle className="text-green-600" size={20} />
              ) : innovation.status === "Pending" ? (
                <FaClock className="text-yellow-600" size={20} />
              ) : (
                <IoMdCloseCircle className="text-red-600" size={20} />
              )}
              <span
                className={`${
                  innovation.status === "Approved"
                    ? "text-green-600"
                    : innovation.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {innovation.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Innovation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-gray-700 flex items-center gap-2 text-lg">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Cost:</span> ${innovation.cost}
          </p>
          <p className="text-gray-700 flex items-center gap-2 text-lg">
            <FaBuilding className="text-blue-600" />
            <span className="font-semibold">Category:</span>{" "}
            {innovation.category.name}
          </p>
        </div>

        {/* Investment & Commitment Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Investments & Commitments
          </h3>

          {/* ✅ Check if investments exist & ensure it's an array */}
          {innovation.investments &&
          Array.isArray(innovation.investments) &&
          innovation.investments.length > 0 ? (
            innovation.investments.map((investment) => (
              <div
                key={investment._id}
                className="border p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">Investor:</span>{" "}
                  {investment.investor.firstName} {investment.investor.lastName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span> $
                  {investment.amount}
                </p>
                <Link
                  to={`/chat/${investment.investor._id}`}
                  className="mt-2 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  <FaComments size={18} /> Chat with Investor
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              🚀 No investments yet. Be the first to invest!
            </p>
          )}
        </div>

        {/* Innovator Information */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Innovator</h3>
          <div className="flex items-center gap-4">
            <img
              src={
                innovation.createdBy.photo
                  ? `${innovation.createdBy.photo}`
                  : "https://via.placeholder.com/50"
              }
              alt="Innovator"
              className="w-14 h-14 rounded-full border-2 border-indigo-500"
            />
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {innovation.createdBy.firstName} {innovation.createdBy.lastName}
              </p>
              <p className="text-gray-600">{innovation.createdBy.email}</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ShowInnovation;
