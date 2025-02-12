import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaClipboardList,
  FaChartBar,
  FaHandshake,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
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

// ✅ Simulated API Data
const generateRandomData = () => ({
  totalInvestments: Math.floor(Math.random() * 50) + 10,
  totalCommitments: Math.floor(Math.random() * 20) + 5,
  pendingRequests: Math.floor(Math.random() * 10),
  approvedInvestments: Math.floor(Math.random() * 30) + 5,
  rejectedInvestments: Math.floor(Math.random() * 10),
  totalInvestors: Math.floor(Math.random() * 100) + 20,
  investmentRequests: [
    { id: "1", innovation: "AI Assistant", status: "Pending", amount: 5000 },
    {
      id: "2",
      innovation: "Blockchain Security",
      status: "Approved",
      amount: 7000,
    },
    {
      id: "3",
      innovation: "Green Energy Startup",
      status: "Rejected",
      amount: 4000,
    },
    {
      id: "4",
      innovation: "E-learning Platform",
      status: "Pending",
      amount: 6000,
    },
  ],
  investmentTrends: Array.from({ length: 6 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
    investments: Math.floor(Math.random() * 10) + 2,
  })),
  categoryDistribution: [
    { category: "Tech", value: Math.random() * 50 },
    { category: "Finance", value: Math.random() * 30 },
    { category: "Energy", value: Math.random() * 20 },
    { category: "Health", value: Math.random() * 10 },
  ],
});

const InvestorDashboard = () => {
  const [stats, setStats] = useState(generateRandomData());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvestorStats();
  }, []);

  const fetchInvestorStats = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setStats(generateRandomData()); // Replace with API call later
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("❌ Error fetching investor stats:", error);
    }
  };

  // ✅ Accept/Reject Requests
  const handleStatusChange = async (id, status) => {
    setStats((prev) => ({
      ...prev,
      investmentRequests: prev.investmentRequests.map((req) =>
        req.id === id ? { ...req, status } : req
      ),
    }));
  };

  

  return (
    <UserLayout selectedPage={"dashboard-investor"}>
      {loading ? (
        <p className="text-center text-gray-600">Loading dashboard...</p>
      ) : (
        <div className="max-w-7xl mx-auto p-6">
          {/* ✅ Page Header */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Investor Dashboard
          </motion.h2>

          {/* ✅ Statistics Grid */}
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

          {/* ✅ Charts Section */}
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
                  >
                    {stats.categoryDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          ["#4F46E5", "#EC4899", "#10B981", "#F59E0B"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* ✅ Investment Requests (Container does NOT scale, but items DO) */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Investment Requests
            </h3>
            {stats.investmentRequests.map((req) => (
              <motion.div
                key={req.id}
                whileHover={{ scale: 1.02 }} // ✅ Scale only on hover
                className="flex justify-between items-center p-4 border-b transition-all"
              >
                <p className="text-gray-700">
                  <strong>{req.innovation}</strong> - ${req.amount}
                </p>
                <div>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        className="bg-green-600 text-white px-4 py-1 rounded mr-2 hover:bg-green-700 transition"
                        onClick={() => handleStatusChange(req.id, "Approved")}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => handleStatusChange(req.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        req.status === "Approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default InvestorDashboard;
