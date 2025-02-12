import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getInnovationById } from "../services/users/innovations";
import {
  FaDollarSign,
  FaRegCalendarAlt,
  FaUser,
  FaBuilding,
  FaComments,
  FaPlayCircle,
  FaImage,
} from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import UserLayout from "../layouts/UserLayout";

const InnovationDetail = () => {
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
    <UserLayout selectedPage={"innovations"}>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        {/* Innovation Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6 mb-6">
          {/* Image / Video */}
          <div className="w-full md:w-2/3 relative">
            {innovation.video ? (
              <div className="relative">
                <video
                  controls
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                >
                  <source
                    src={`http://localhost:5000${innovation.video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
                  <FaPlayCircle /> Video
                </div>
              </div>
            ) : innovation.image ? (
              <div className="relative">
                <img
                  src={`http://localhost:5000${innovation.image}`}
                  alt={innovation.name}
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
                  <FaImage /> Image
                </div>
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/600"
                alt="No media available"
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
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
                <IoIosCheckmarkCircleOutline
                  className="text-green-600"
                  size={20}
                />
              ) : (
                <MdPendingActions className="text-yellow-600" size={20} />
              )}
              <span
                className={`${
                  innovation.status === "Approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {innovation.status}
              </span>
            </div>
          </div>
        </div>

        {/* Innovation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-gray-700 flex items-center gap-2 text-lg">
            <FaDollarSign className="text-green-600" />
            <span className="font-semibold">Cost:</span> ${innovation.cost}
          </p>
          <p className="text-gray-700 flex items-center gap-2 text-lg">
            <FaRegCalendarAlt className="text-indigo-600" />
            <span className="font-semibold">Published:</span>{" "}
            {new Date(innovation.publishDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700 flex items-center gap-2 text-lg">
            <FaBuilding className="text-blue-600" />
            <span className="font-semibold">Category:</span>{" "}
            {innovation.category.name}
          </p>
        </div>

        {/* Innovator Profile */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Innovator</h3>
          <div className="flex items-center gap-4">
            <img
              src={
                innovation.createdBy.photo
                  ? `http://localhost:5000${innovation.createdBy.photo}`
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

          {/* Chat Button */}
          <Link
            to={`/chat/${innovation.createdBy._id}`}
            className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            <FaComments size={18} />
            Chat with Innovator
          </Link>
        </div>

        {/* Investments */}
        {innovation.investments && innovation.investments.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Investments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {innovation.investments.map((investment) => (
                <div
                  key={investment._id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Investor:</span>{" "}
                    {investment.investor.firstName}{" "}
                    {investment.investor.lastName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Amount:</span> $
                    {investment.amount}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(investment.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Description */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Details</h3>
          <p className="text-gray-700 leading-relaxed">{innovation.details}</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default InnovationDetail;
