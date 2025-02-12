import React, { useEffect, useState } from "react";
import { getAllCounts } from "../../services/authAdmin";

import {
  FaUsers,
  FaLightbulb,
  FaBell,
  FaUserTie,
  FaMoneyBill,
  FaUserShield,
  FaComments,
  FaShapes, // New icon for categories
} from "react-icons/fa";

const DashboardSummary = () => {
  const [counts, setCounts] = useState({
    admins: 0,
    categories: 0,
    innovations: 0,
    innovators: 0,
    investors: 0,
    commitments: 0,
    investments: 0,
    notifications: 0,
    chatMessages: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getAllCounts();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { label: "Investors", value: counts.investors, icon: <FaUserTie size={20} />, color: "bg-blue-500" },
    { label: "Innovators", value: counts.innovators, icon: <FaUsers size={20} />, color: "bg-green-500" },
    { label: "Innovations", value: counts.innovations, icon: <FaLightbulb size={20} />, color: "bg-yellow-500" },
    { label: "Categories of Innovations", value: counts.categories, icon: <FaShapes size={20} />, color: "bg-teal-500" },
    { label: "Notifications", value: counts.notifications, icon: <FaBell size={20} />, color: "bg-pink-500" },
    { label: "Investments", value: counts.investments, icon: <FaMoneyBill size={20} />, color: "bg-purple-500" },
    { label: "Admins", value: counts.admins, icon: <FaUserShield size={20} />, color: "bg-red-500" },
    { label: "Chatting", value: counts.chatMessages, icon: <FaComments size={20} />, color: "bg-indigo-500" },
  ];

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-all transform hover:scale-105 duration-300"
        >
          <div className={`p-2 ${stat.color} rounded-full text-white shadow-md`}>
            {stat.icon}
          </div>
          <h3 className="text-2xl font-bold mt-2 text-gray-900">{stat.value}</h3>
          <p className="text-gray-700 text-sm font-medium text-center">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
