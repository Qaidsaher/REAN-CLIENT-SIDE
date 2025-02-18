import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getInnovatorById,
  getInnovationsByInnovator,
} from "../services/websiteService";
import {
  FaEnvelope,
  FaLightbulb,
  FaUser,
  FaBuilding,
  FaCity,
  FaGraduationCap,
  FaBirthdayCake,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { IoMdRibbon } from "react-icons/io";
import UserLayout from "../layouts/UserLayout";

const InnovatorProfile = () => {
  const { id } = useParams();
  const [innovator, setInnovator] = useState(null);
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInnovator();
    fetchInnovations();
  }, []);

  const fetchInnovator = async () => {
    try {
      const data = await getInnovatorById(id);
      setInnovator(data);
    } catch (error) {
      console.error("❌ Error fetching innovator:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInnovations = async () => {
    try {
      const data = await getInnovationsByInnovator(id);
      setInnovations(data);
    } catch (error) {
      console.error("❌ Error fetching innovations:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (!innovator) {
    return <p className="text-center text-red-500">Innovator not found.</p>;
  }

  return (
    <UserLayout selectedPage={"innvators"}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                innovator.photo
                  ? `http://localhost:5000${innovator.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt={innovator.firstName}
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600 shadow-md"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <FaUser className="text-indigo-600" /> {innovator.firstName}{" "}
              {innovator.lastName}
            </h2>
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <FaEnvelope className="text-gray-500" /> {innovator.email}
            </p>
            <p className="text-lg text-gray-700 flex items-center gap-2">
              <FaCity className="text-blue-600" /> {innovator.city}
            </p>
            {/* Innovator Badge */}
            <span className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-600 border border-indigo-400 shadow-md">
              <IoMdRibbon size={18} />
              Innovator
            </span>
          </div>
        </div>

        {/* Bio Section */}
        {innovator.bio && (
          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MdOutlineDescription className="text-indigo-600" /> About{" "}
              {innovator.firstName}
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">
              {innovator.bio}
            </p>
          </div>
        )}

        {/* Additional Information Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Education */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
            <FaGraduationCap className="text-green-600 text-3xl" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Education</h4>
              <p className="text-gray-700">
                {innovator.education || "Not specified"}
              </p>
            </div>
          </div>

          {/* Birthday */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
            <FaBirthdayCake className="text-yellow-600 text-3xl" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Birthday</h4>
              <p className="text-gray-700">
                {innovator.birthday
                  ? new Date(innovator.birthday).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
            <FaPhoneAlt className="text-indigo-600 text-3xl" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Phone Number
              </h4>
              <p className="text-gray-700">
                {innovator.phone || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Innovations Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" /> Innovations by{" "}
            {innovator.firstName}
          </h3>

          {innovations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {innovations.map((innovation) => (
                <div
                  key={innovation._id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
                >
                  <img
                    src={
                      innovation.image
                        ? `http://localhost:5000${innovation.image}`
                        : "https://via.placeholder.com/300"
                    }
                    alt={innovation.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {innovation.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {innovation.description.substring(0, 80)}...
                  </p>
                  <Link
                    to={`/innovations/${innovation._id}`}
                    className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    <FaLightbulb />
                    View Innovation
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-4">No innovations found.</p>
          )}
        </div>

        {/* Chat with Innovator Button */}
        <div className="fixed bottom-6 right-6">
          <Link
            to={`/chat/${innovator._id}`}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            <FaEnvelope className="text-white" />
            Chat with {innovator.firstName}
          </Link>
        </div>
      </div>
    </UserLayout>
  );
};

export default InnovatorProfile;
