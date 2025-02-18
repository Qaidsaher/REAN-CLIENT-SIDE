import React, { useEffect, useState } from "react";
import { getInvestments, deleteInvestment } from "../../services/admins/investmentService";
import AdminLayout from "../../layouts/AdminLayout";
import Notification from "../../components/UI/Notification";
import { FaMoneyBillWave, FaUserTie, FaLightbulb, FaCalendarAlt, FaTrash, FaSearch, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvestments();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchInvestments = async () => {
    try {
      const data = await getInvestments();
      setInvestments(data);
      setFilteredInvestments(data);
    } catch (error) {
      console.error("Error fetching investments:", error);
      showMessage("Error fetching investments", "error");
    }
  };

  const handleDelete = async (investmentId) => {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      try {
        await deleteInvestment(investmentId);
        fetchInvestments();
        showMessage("Investment deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting investment:", error);
        showMessage("Error deleting investment", "error");
      }
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = investments.filter((investment) =>
      investment.innovation?.name.toLowerCase().includes(value.toLowerCase()) ||
      investment.investor?.firstName.toLowerCase().includes(value.toLowerCase()) ||
      investment.investor?.lastName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredInvestments(filtered);
  };

  const handleDetails = (id) => {
    navigate(`/admin/investments/${id}`);
  };

  return (
    <AdminLayout selectedNav={"investments"}>
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">Manage Investments</h2>
        <Notification message={message} messageType={messageType} onClose={() => setMessage(null)} />

        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by Innovation or Investor"
            className="w-full p-3 border border-indigo-400 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
          />
          <FaSearch className="text-indigo-600 text-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvestments.map((investment) => (
            <div key={investment._id} className="bg-white shadow-lg rounded-lg p-6 border border-indigo-300 hover:shadow-xl transition-all hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500 text-3xl" /> ${investment.amount}
              </h3>
              <div className="mb-2 flex items-center gap-2">
                <FaUserTie className="text-blue-500 text-xl" />
                <span className="text-gray-700 font-medium">Investor:</span>
                <span className="text-gray-900">{investment.investor?.firstName} {investment.investor?.lastName}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500 text-xl" />
                <span className="text-gray-700 font-medium">Innovation:</span>
                <span className="text-gray-900">{investment.innovation?.name}</span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500 text-xl" />
                <span className="text-gray-700 font-medium">Date:</span>
                <span className="text-gray-900">{new Date(investment.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mb-4">
                <span className={`px-3 py-1 text-sm rounded-full ${investment.commitment.status === "Active" ? "bg-green-100 text-green-800" : investment.commitment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                  {investment.commitment.status}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDetails(investment._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                >
                  <FaInfoCircle /> Details
                </button>
                <button
                  onClick={() => handleDelete(investment._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInvestments.length === 0 && (
          <div className="text-center text-gray-500 mt-6">No investments available.</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Investments;
