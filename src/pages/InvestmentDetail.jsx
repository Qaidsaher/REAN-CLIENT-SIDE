import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvestmentById } from "../services/websiteService";
import {
  FaUserTie,
  FaLightbulb,
  FaDollarSign,
  FaBuilding,
  FaEnvelope,
  FaGraduationCap,
  FaPhoneAlt,
  FaFileContract,
} from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const InvestmentDetail = () => {
  const { id } = useParams();
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestment();
  }, []);

  const fetchInvestment = async () => {
    try {
      const data = await getInvestmentById(id);
      setInvestment(data);
    } catch (error) {
      console.error("❌ Error fetching investment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600">Loading investment details...</p>
    );
  if (!investment)
    return <p className="text-center text-red-500">Investment not found.</p>;

  return (
    <UserLayout selectedPage={"investments"}>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-4xl font-bold text-gray-900 ">
          {investment.innovation.name}
        </h2>
        <p className="text-gray-700 mt-2 ">
          {investment.innovation.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Investor Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUserTie className="text-indigo-600" /> Investor
            </h3>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Name:</span>{" "}
              {investment.commitment.investor.firstName}{" "}
              {investment.commitment.investor.lastName}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />{" "}
              {investment.commitment.investor.email}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaBuilding className="text-blue-600" />{" "}
              {investment.commitment.investor.company || "Independent Investor"}
            </p>
          </div>

          {/* Innovation Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaLightbulb className="text-yellow-500" /> Innovation
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              {investment.innovation.status}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaDollarSign className="text-green-600" /> Cost: $
              {investment.innovation.cost}
            </p>
          </div>

          {/* Innovator Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUserTie className="text-indigo-600" /> Innovator
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span>{" "}
              {investment.innovation.createdBy.firstName}{" "}
              {investment.innovation.createdBy.lastName}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />{" "}
              {investment.innovation.createdBy.email}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaGraduationCap className="text-green-600" />{" "}
              {investment.innovation.createdBy.education || "Not specified"}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaPhoneAlt className="text-indigo-600" />{" "}
              {investment.innovation.createdBy.phone || "Not provided"}
            </p>
          </div>

          {/* Category Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaBuilding className="text-purple-600" /> Category
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span>{" "}
              {investment.innovation.category.name}
            </p>
          </div>

          {/* Commitment Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md col-span-2">
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FaFileContract className="text-red-600" /> Commitment Conditions
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Conditions:</span>{" "}
              {investment.commitment.conditions}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default InvestmentDetail;
