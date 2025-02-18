import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboard } from "../../services/admins/adminServices";
import { Bar, Line, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { FaChartBar, FaFolder, FaUsers, FaClipboardList, FaLightbulb, FaProjectDiagram, FaDollarSign, FaMoneyCheckAlt } from 'react-icons/fa';

function Index() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return <AdminLayout selectedNav={"dashboard"}><div className="text-center mt-10">Loading dashboard...</div>
  </AdminLayout>;
  if (error) return <AdminLayout selectedNav={"dashboard"}><div className="text-center text-red-600 mt-10">{error}</div></AdminLayout>;

  const { totals, charts, recent } = dashboardData;

  const categoryChart = {
    labels: charts.innovationsByCategory.map(item => item.name || "Unknown"),
    datasets: [{
      label: "Innovations by Category",
      data: charts.innovationsByCategory.map(item => item.count),
      backgroundColor: "#6366F1",
      borderRadius: 10,
    }],
  };

  const investmentsChart = {
    labels: charts.investmentsByStatus.map(item => item._id),
    datasets: [{
      label: "Investments by Status",
      data: charts.investmentsByStatus.map(item => item.count),
      backgroundColor: ["#22C55E", "#FACC15", "#EF4444"],
      borderRadius: 10,
    }],
  };

  const messagesChart = {
    labels: charts.messagesByDate.map(item => item._id),
    datasets: [{
      label: "Messages Over Time",
      data: charts.messagesByDate.map(item => item.count),
      fill: true,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#3B82F6",
      borderWidth: 2,
      tension: 0.4,
    }],
  };

  const iconMap = {
    admins: <FaUsers className="text-indigo-500 text-3xl" />,
    categories: <FaClipboardList className="text-purple-500 text-3xl" />,
    chats: <FaChartBar className="text-blue-500 text-3xl" />,
    commitments: <FaClipboardList className="text-teal-500 text-3xl" />,
    innovations: <FaLightbulb className="text-yellow-500 text-3xl" />,
    innovators: <FaUsers className="text-pink-500 text-3xl" />,
    investments: <FaDollarSign className="text-green-500 text-3xl" />,
    investors: <FaUsers className="text-cyan-500 text-3xl" />,
    messages: <FaChartBar className="text-red-500 text-3xl" />,
    notifications: <FaChartBar className="text-orange-500 text-3xl" />,
  };

  return (
    <AdminLayout selectedNav={"dashboard"}>
      {loading ? (
        <div className="text-center mt-10">Loading dashboard...</div>
      ) : error ? (
        <div className="text-center text-red-600 mt-10">{error}</div>
      ) : (
        <>
          <div className="p-6 space-y-6">
            <h1 className="text-5xl font-bold text-center text-indigo-700 mb-6 animate-pulse">📊 Admin Dashboard</h1>


            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(totals).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-r from-indigo-100 to-blue-100 shadow-lg rounded-md p-6 text-center border border-indigo-300 hover:shadow-xl transition-transform transform hover:-translate-y-2">
                  {iconMap[key] || <FaChartBar className="text-gray-400 text-7xl" />}
                  <h2 className="mt-4 text-xl font-semibold capitalize text-gray-700">{key}</h2>
                  <p className="text-4xl font-bold text-indigo-600 mt-2">{value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white col-span-3 p-6 shadow-md rounded-md border border-indigo-500  hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-1 text-indigo-600"> List View of Charts  </h3>
              </div>
              <div className="bg-white p-6 shadow-md rounded-md border border-indigo-500  hover:shadow-xl">
                <Bar data={categoryChart} options={{ responsive: true }} />
              </div>

              <div className="bg-white  px-6 py-2 shadow-md rounded-md border border-indigo-500  hover:shadow-xl" style={{ height: '300px' }}>
                <h3 className="text-xl font-semibold mb-1 text-green-600">Investments by Status</h3>
                <Pie data={investmentsChart} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 shadow-lg rounded-md border border-indigo-600 hover:shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-indigo-700 flex items-center gap-3">
                  <span className="text-indigo-700"><FaFolder /></span> Innovations by Category
                </h3>
                <ul className="space-y-3">
                  {charts.innovationsByCategory.map(item => (
                    <li key={item._id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow hover:bg-indigo-100 transition">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl"><FaFolder /></span>
                        <span className="font-medium text-gray-800">{item.name || "Unknown"}</span>
                      </div>
                      <span className="bg-yellow-600 text-white p-1 rounded-full  w-6 h-6 flex justify-center items-center ">
                        {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            <div className="bg-white p-6 shadow-md rounded-md border border-indigo-500  hover:shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Messages Over Time</h3>
              <Line data={messagesChart} options={{ responsive: true }} />
            </div>
            <div className="mt-6">
              <div className="bg-white col-span-3 p-6 shadow-md rounded-md border border-indigo-500  hover:shadow-xl my-3">
                <h2 className="text-2xl font-semibold  text-indigo-500">Recent Activities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 shadow-md rounded-md border border-indigo-500 hover:shadow-xl">
                  <h4 className="text-lg font-semibold mb-3 text-yellow-600 flex items-center gap-2">
                    <span className="text-yellow-500"><FaLightbulb className="text-2xl" /></span> Latest Innovations
                  </h4>
                  <ul className="space-y-2">
                    {recent.latestInnovations.map(innovation => (
                      <li key={innovation._id} className="border-b pb-2 hover:text-indigo-600 cursor-pointer flex items-center gap-3">
                        <FaProjectDiagram className="text-blue-500 text-2xl" />
                        {innovation.name} -
                        <span className={`italic ${innovation.status === 'Pending' ? 'text-yellow-500' : innovation.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                          {innovation.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 shadow-md rounded-md border border-indigo-500 hover:shadow-xl">
                  <h4 className="text-lg font-semibold mb-3 text-green-600 flex items-center gap-2">
                    <span className="text-green-500"><FaDollarSign className="text-2xl" /></span> Latest Investments
                  </h4>
                  <ul className="space-y-2">
                    {recent.latestInvestments.map(investment => (
                      <li key={investment._id} className="border-b pb-2 hover:text-indigo-600 cursor-pointer flex items-center gap-3">
                        <FaMoneyCheckAlt className="text-purple-500 text-2xl" />
                        Amount: ${investment.amount} -
                        <span className={`italic ${investment.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                          {investment.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </AdminLayout>
  );
}

export default Index;