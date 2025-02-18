
// ✅ React Page: MyActivity to show all user investments and commitments
import React, { useEffect, useState, useContext } from "react";
import {
    getUserInvestments,
    getUserCommitments,
    signCommitmentInvestor,
    signCommitmentInnovator,
    createInvestmentWithCommitment,
} from "../services/profileServices";
// import { AuthContext } from "../context/AuthContext";
import UserLayout from "../layouts/UserLayout";
import {
    FaHandshake,
    FaClipboardList,
    FaSignInAlt,
    FaSignOutAlt,
    FaMoneyCheckAlt,
    FaPlusCircle,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const MyActivity = () => {
    const [investments, setInvestments] = useState([]);
    const [commitments, setCommitments] = useState([]);
    const [formData, setFormData] = useState({
        innovationId: "",
        amount: "",
        milestones: "",
    });
    const { role } = useAuth();

    useEffect(() => {
        fetchActivity();
    }, []);

    const fetchActivity = async () => {
        try {
            const investmentsData = await getUserInvestments();
            const commitmentsData = await getUserCommitments();
            setInvestments(investmentsData);
            setCommitments(commitmentsData);
        } catch (error) {
            console.error("Failed to fetch user activity", error);
        }
    };

    const handleSignCommitment = async (commitmentId) => {
        try {
            if (role === "investor") {
                await signCommitmentInvestor(commitmentId);
            } else {
                await signCommitmentInnovator(commitmentId);
            }
            fetchActivity();
        } catch (error) {
            console.error("Failed to sign commitment", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createInvestmentWithCommitment(formData);
            alert("Investment created successfully!");
            fetchActivity();
        } catch (error) {
            console.error("Failed to create investment", error);
        }
    };

    return (
        <UserLayout selectedPage="my-activity">
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-4xl font-bold text-indigo-600 mb-6">📊 My Activity</h2>

                {/* Investment Form */}

                {/* {role == "investor" && (
                    <div className="mb-6 bg-white p-6 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold text-purple-700 mb-4">💼 Create Investment with Commitment</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="innovationId"
                                value={formData.innovationId}
                                onChange={handleInputChange}
                                placeholder="Innovation ID"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Investment Amount"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                            <input
                                type="text"
                                name="milestones"
                                value={formData.milestones}
                                onChange={handleInputChange}
                                placeholder="Milestones (comma separated)"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                            >
                                <FaPlusCircle /> Create Investment
                            </button>
                        </form>
                    </div>
                )} */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Investments Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-4">💸 My Investments</h3>
                        {investments.length > 0 ? (
                            investments.map((investment) => (
                                <div
                                    key={investment._id}
                                    className="border-b border-gray-300 pb-4 mb-4"
                                >
                                    <p><strong>Innovation:</strong> {investment.innovation.name}</p>
                                    <p><strong>Amount:</strong> ${investment.amount}</p>
                                    <p><strong>Status:</strong> {investment.status}</p>
                                    <p><strong>Innovator:</strong> {investment.innovator.firstName} {investment.innovator.lastName}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No investments found.</p>
                        )}
                    </div>

                    {/* Commitments Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-green-700 mb-4">🤝 My Commitments</h3>
                        {commitments.length > 0 ? (
                            commitments.map((commitment) => (
                                <div
                                    key={commitment._id}
                                    className="border-b border-gray-300 pb-4 mb-4"
                                >
                                    <p><strong>Conditions:</strong> {commitment.conditions || "Pending"}</p>
                                    <p><strong>Status:</strong> {commitment.status}</p>
                                    <p><strong>Milestones:</strong> {commitment.milestones.join(", ")}</p>
                                    <p><strong>innovator : {commitment.innovatorSign&&"TRUE"} -- investor : {commitment.investorSign&&"TRUE"}</strong></p>
                                    <button
                                        onClick={() => handleSignCommitment(commitment._id)}
                                        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                    >
                                        Sign Commitment
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No commitments found.</p>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default MyActivity;
