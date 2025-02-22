import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInnovationById } from "../services/websiteService";
import {
  FaDollarSign,
  FaRegCalendarAlt,
  FaBuilding,
  FaTrashAlt,
  FaPlus,
  FaCheckCircle
} from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import UserLayout from "../layouts/UserLayout";
import { useAuth } from "../contexts/AuthContext";
import { createInvestmentWithCommitment } from '../services/profileServices';

const InnovationDetail = () => {
  const { id } = useParams();
  const [innovation, setInnovation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    innovationId: id,
    amount: "",
    milestones: [""]
  });
  const [hasInvestment, setHasInvestment] = useState(false);
  const [investorInvestments, setInvestorInvestments] = useState([]);

  const { role, user } = useAuth();

  // Fetch innovation data on mount
  useEffect(() => {
    fetchInnovation();
  }, []);

  const fetchInnovation = async () => {
    try {
      const data = await getInnovationById(id);
      setInnovation(data);

      // Safely check if the authenticated investor already has an investment
      const investorInvestment = data.investments.some(inv => inv.investor && inv.investor._id === user.id);
      setHasInvestment(investorInvestment);

      // Filter investments belonging to the authenticated investor safely
      const userInvestments = data.investments.filter(inv => inv.investor && inv.investor._id === user.id);
      setInvestorInvestments(userInvestments);
    } catch (error) {
      console.error("❌ Error fetching innovation details:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, ""]
    });
  };

  const handleRemoveMilestone = (index) => {
    const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      milestones: updatedMilestones
    });
  };

  const handleMilestoneChange = (index, value) => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index] = value;
    setFormData({
      ...formData,
      milestones: updatedMilestones
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInvestmentSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    try {
      await createInvestmentWithCommitment(formData);
      // Refresh the data and hide the form after investment
      await fetchInnovation();
    } catch (error) {
      console.error("Error submitting investment:", error);
      alert("An error occurred while submitting the investment.");
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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6 mb-6">
          <div className="w-full md:w-2/3 relative">
            {innovation.video ? (
              <div className="relative">
                <video
                  controls
                  className="w-full h-72 object-cover rounded-lg shadow-lg"
                >
                  <source
                    src={`${innovation.video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : innovation.image ? (
              <img
                src={`${innovation.image}`}
                alt={innovation.name}
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <img
                src="https://via.placeholder.com/600"
                alt="No media available"
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900">{innovation.name}</h2>
            <p className="text-gray-600 mt-2">{innovation.description}</p>

            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md bg-gray-100">
              {innovation.status === "Approved" ? (
                <IoIosCheckmarkCircleOutline className="text-green-600" size={20} />
              ) : (
                <MdPendingActions className="text-yellow-600" size={20} />
              )}
              <span className={innovation.status === "Approved" ? "text-green-600" : "text-yellow-600"}>
                {innovation.status}
              </span>
            </div>
          </div>
        </div>

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
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Details</h3>
          <p className="text-gray-700 leading-relaxed">{innovation.details}</p>
        </div>
        {/* Modernized Investment Display */}
        {role === "investor" && (<div className="mt-8 bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Your Investments</h3>
          {investorInvestments.length > 0 ? (
            <ul className="list-none space-y-2">
              {investorInvestments.map((inv, index) => (
                <li key={index} className="text-gray-700 bg-gray-100 p-3 rounded-md border-l-4 border-green-500">
                  💲 Amount: ${inv.amount} | 🛠️ Status: <span className="font-bold">{inv.status}</span> | 🗓️ Date: {new Date(inv.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You have not made any investments in this innovation.</p>
          )}
        </div>)}

        {/* Show Investment Button Only if No Investment Exists */}
        {role === "investor" && !hasInvestment && (
          <button
            className="mt-6 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-md hover:scale-105 transition-all shadow-lg"
            onClick={() => setShowModal(true)}
          >
            💼 Make Investment with this Innovation
          </button>
        )}

        {/* Investment Form */}
        {showModal && (
          <div className="mt-4 w-full bg-white p-6 rounded-md shadow-md border-t-2 border-green-500">
            <h3 className="text-2xl font-bold mb-4 text-green-700">💰 Make Investment</h3>
            <form onSubmit={handleInvestmentSubmit}>
              <input type="hidden" name="innovationId" value={formData.innovationId} />
              <input
                type="number"
                name="amount"
                placeholder="Investment Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <button
                type="button"
                className="my-1 flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                onClick={handleAddMilestone}
              >
                <FaPlus /> Add Milestone
              </button>
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    name="milestones"
                    placeholder="Milestone"
                    value={milestone}
                    onChange={(e) => handleMilestoneChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  type="submit"
                >
                  ✅ Submit Investment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default InnovationDetail;
