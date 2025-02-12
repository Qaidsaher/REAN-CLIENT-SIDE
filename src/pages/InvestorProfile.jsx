import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getInvestorById } from "../services/users/investors";
import {
  FaEnvelope,
  FaBuilding,
  FaPhoneAlt,
  FaUserTie,
  FaDollarSign,
  FaGraduationCap,
  FaBirthdayCake,
  FaCity,
  FaLightbulb,
} from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import UserLayout from "../layouts/UserLayout";

const InvestorProfile = () => {
  const { id } = useParams();
  const [investor, setInvestor] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestor();
  }, []);

  const fetchInvestor = async () => {
    try {
      const data = await getInvestorById(id);
      console.log("Fetched Investor Data:", data); // Debugging
      setInvestor(data.investor);
      setInvestments(data.investments);
    } catch (error) {
      console.error("❌ Error fetching investor:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (!investor) {
    return <p className="text-center text-red-500">Investor not found.</p>;
  }

  return (
    <UserLayout selectedPage={"investors"}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                investor.photo
                  ? `http://localhost:5000${investor.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt={investor.firstName}
              className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600 shadow-md"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <FaUserTie className="text-indigo-600" /> {investor.firstName}{" "}
              {investor.lastName}
            </h2>
            <p className="text-lg text-gray-600 flex items-center gap-2">
              <FaEnvelope className="text-gray-500" /> {investor.email}
            </p>
            <p className="text-lg text-gray-700 flex items-center gap-2">
              <FaCity className="text-blue-600" />{" "}
              {investor.city || "No city provided"}
            </p>

            {/* Investor Badge */}
            <span className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-600 border border-green-400 shadow-md">
              <FaDollarSign size={18} />
              Investor
            </span>
          </div>
        </div>

        {/* Bio Section */}
        {investor.bio && (
          <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MdOutlineDescription className="text-indigo-600" /> About{" "}
              {investor.firstName}
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">{investor.bio}</p>
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
                {investor.education || "Not specified"}
              </p>
            </div>
          </div>

          {/* Birthday */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-3">
            <FaBirthdayCake className="text-yellow-600 text-3xl" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Birthday</h4>
              <p className="text-gray-700">
                {investor.birthday
                  ? new Date(investor.birthday).toLocaleDateString()
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
                {investor.phone || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Investments Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaDollarSign className="text-green-500" /> Investments by{" "}
            {investor.firstName}
          </h3>

          {investments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {investments.map((investment) => (
                <div
                  key={investment._id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {investment.innovation.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">Amount Invested:</span> $
                    {investment.amount}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(investment.date).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/innovations/${investment.innovation._id}`}
                    className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    <FaLightbulb />
                    View Innovation
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-4">No investments yet.</p>
          )}
        </div>

        {/* Chat with Investor Button */}
        <div className="fixed bottom-6 right-6">
          <Link
            to={`/chat/${investor._id}`}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
          >
            <FaEnvelope className="text-white" />
            Chat with {investor.firstName}
          </Link>
        </div>
      </div>
    </UserLayout>
  );
};

export default InvestorProfile;
