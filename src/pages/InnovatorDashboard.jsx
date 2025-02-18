import React, { useEffect, useState } from "react";
import {
  FaLightbulb,
  FaChartLine,
  FaBell,
  FaUsers,
  FaComments,
  FaHandshake,
  FaFolderOpen,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { getInnovatorStats } from "../services/profileServices";
import UserLayout from "../layouts/UserLayout";

// ✅ Statistics Card Component
const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="border border-gray-300 bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all"
  >
    <div className={`${color} text-4xl mx-auto mb-2`}>{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-3xl font-bold text-gray-700 mt-2">{typeof value === 'object' ? JSON.stringify(value) : value}</p>
  </motion.div>
);

const InnovatorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getInnovatorStats();
      setStats(data);
      
    } catch (error) {
      console.error("❌ Error fetching innovator stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await handleInvestmentRequest(id, status);
      fetchStats();
    } catch (error) {
      console.error("❌ Error updating investment:", error);
    }
  };

  // ✅ Prevent undefined errors by setting default values
  const {
    notifications = 0,
    chats = 0,
    totalInnovations = 0,
    totalFunding = 0,
    commitments = 0,
    pendingInnovations = [],
    investmentRequests = [],
    investmentTrends = [],
  } = stats || {};

  return (
    <UserLayout selectedPage={"dashboard-innovator"}>
      {loading ? (
        <p className="text-center text-gray-600">Loading dashboard...</p>
      ) : (
        <div className="max-w-7xl mx-auto p-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Innovator Dashboard
          </motion.h2>

          {/* ✅ Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <StatCard
              icon={<FaBell />}
              title="Notifications"
              value={notifications}
              color="text-indigo-600"
            />
            <StatCard
              icon={<FaComments />}
              title="Chats"
              value={chats}
              color="text-blue-600"
            />
            <StatCard
              icon={<FaLightbulb />}
              title="Total Innovations"
              value={totalInnovations}
              color="text-green-600"
            />
            <StatCard
              icon={<FaChartLine />}
              title="Total Funding"
              value={`$${totalFunding}`}
              color="text-yellow-600"
            />
            <StatCard
              icon={<FaHandshake />}
              title="Commitments"
              value={Array.isArray(commitments) ? commitments.length : commitments}
              color="text-purple-600"
            />
            <StatCard
              icon={<FaUsers />}
              title="Investors in Chat"
              value={chats}
              color="text-red-600"
            />
          </div>

          {/* ✅ Investment Trends Chart */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Investment Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={investmentTrends}>
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
          </div>

          {/* ✅ Pending Innovations */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Pending Innovations
            </h3>
            {pendingInnovations.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {pendingInnovations.map((innovation) => (
                  <li
                    key={innovation._id}
                    className="py-4 flex justify-between items-center"
                  >
                    <span className="text-gray-700 flex items-center gap-2">
                      <FaFolderOpen className="text-yellow-500" />
                      <strong>{innovation.name}</strong>
                    </span>
                    <FaClock className="text-yellow-500" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">
                No pending innovations.
              </p>
            )}
          </div>

          {/* ✅ Investment Requests */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Investment Requests   
            </h3>
            {investmentRequests.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {investmentRequests.map((request) => (
                  <li
                    key={request._id}
                    className="py-4 flex justify-between items-center"
                  >
                    <span className="text-gray-700 text-lg">
                      <strong>
                        {request.investor?.firstName} {request.investor?.lastName}
                      </strong>{" "}
                      requested ${request.amount}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                        onClick={() =>
                          handleStatusChange(request._id, "Approved")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() =>
                          handleStatusChange(request._id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">
                No investment requests.
              </p>
            )}
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default InnovatorDashboard;