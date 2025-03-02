import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaMoneyBillWave,
  FaClipboardList,
  FaChartBar,
  FaHandshake,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaDollarSign
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import UserLayout from "../layouts/UserLayout";
import { getDashboard } from "../services/profileServices";

// ✅ Chart Card (Does NOT scale)
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

// ✅ Stat Card (Scales when hovered)
const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
  >
    <div className={`${color} text-4xl`}>{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </motion.div>
);

const InvestorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchInvestorStats();
  }, []);

  const fetchInvestorStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboard();
      setStats(data);
    } catch (error) {
      console.error("❌ Error fetching investor stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      fetchInvestorStats();
    } catch (error) {
      console.error("❌ Error updating investment status:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading dashboard...</p>;
  }

  if (!stats) {
    return <p className="text-center text-gray-600">No data available.</p>;
  }

  return (
    <UserLayout selectedPage="dashboard-investor">
      <div className="max-w-7xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-6"
        >
          Investor Dashboard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<FaMoneyBillWave />}
            title="Total Investments"
            value={stats.totalInvestments}
            color="text-green-600"
          />
          <StatCard
            icon={<FaClipboardList />}
            title="Total Commitments"
            value={stats.totalCommitments}
            color="text-blue-600"
          />
          <StatCard
            icon={<FaClock />}
            title="Pending Requests"
            value={stats.pendingRequests}
            color="text-yellow-600"
          />
          <StatCard
            icon={<FaCheckCircle />}
            title="Approved Investments"
            value={stats.approvedInvestments}
            color="text-indigo-600"
          />
          <StatCard
            icon={<FaTimesCircle />}
            title="Rejected Investments"
            value={stats.rejectedInvestments}
            color="text-red-600"
          />
          <StatCard
            icon={<FaUsers />}
            title="Total Investors"
            value={stats.totalInvestors}
            color="text-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ChartCard title="Investment Trends">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.investmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="investments"
                  stroke="#4F46E5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Investment by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#4F46E5"
                  dataKey="value"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Investment Requests
          </h3>
          {stats.investmentRequests.map((request) => (
            <li
              key={request._id}
              className="py-4 flex justify-between items-center"
            >
              <span className="text-gray-700 text-lg flex items-center gap-2">
                <FaDollarSign className="text-yellow-500" />
                <strong>
                  {request.innovation?.name} 
                </strong>{" "}
                requested ${request.amount}
              </span>
              <button
                className="border border-yellow-500 text-yellow-500 px-4 py-1 rounded transition hover:bg-yellow-500 hover:text-white flex items-center gap-2"
                onClick={() => navigate("/my-activity")}
              >
                <FaHourglassHalf /> Show Pending detail
              </button>
            </li>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default InvestorDashboard;
