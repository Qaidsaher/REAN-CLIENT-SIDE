import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaPen, FaCheckCircle } from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";
import {
  getCommitmentById,
  signCommitmentInvestor,
  signCommitmentInnovator,
} from "../services/profileServices";
import { useAuth } from "../contexts/AuthContext";

const Commitment = () => {
  const { id } = useParams(); // Get commitment ID from URL
  const { role } = useAuth(); // Get user role
  const [commitment, setCommitment] = useState(null);
  const [signature, setSignature] = useState("");
  const [notification, setNotification] = useState(null); // For status messages
  const [model, showModal] = useState(true);
  // Fetch commitment details when component loads
  useEffect(() => {
    fetchCommitment();
  }, [id]);

  const fetchCommitment = async () => {
    try {
      const data = await getCommitmentById(id);
      setCommitment(data);
      if (role == "investor" && commitment.signCommitmentInvestor) {
        showModal(false)
      }
      if (role == "innovator" && commitment.signCommitmentInnovator) {
        showModal(false)
      }
    } catch (error) {
      console.error("Error fetching commitment:", error);
    }
  };

  // Handle signing commitment
  const handleSignCommitment = async () => {
    if (!signature.trim()) {
      setNotification({ message: "Please enter your full name as a signature.", type: "error" });
      return;
    }

    try {
      if (role === "investor") {
        await signCommitmentInvestor(id);
      } else if (role === "innovator") {
        await signCommitmentInnovator(id);
      }

      setNotification({ message: "Commitment signed successfully!", type: "success" });

      setTimeout(() => {
        setNotification(null);
      }, 3000); // Auto-hide after 3 seconds

      fetchCommitment(); // Refresh agreement after signing
    } catch (error) {
      console.error("Error signing commitment:", error);
      setNotification({ message: "Failed to sign commitment.", type: "error" });
    }
  };

  const handleDownloadPDF = () => {
    alert("PDF Download Started! (Functionality to be implemented)");
  };

  if (!commitment) {
    return (
      <UserLayout selectedPage="commitments">
        <div className="text-center text-gray-600 p-6">Loading commitment...</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout selectedPage="commitments">
      <section className=" bg-gray-50  ">
        <div className="max-w7xl  px-8 lg:px-16">
          <div className="bg-white shadow-2xl rounded-lg border border-gray-300 p-12">
            {/* Agreement Header */}
            <h1 className="text-center font-bold text-5xl mb-8 text-indigo-700 uppercase tracking-wide">
              Innovation Commitment Agreement
            </h1>

            {/* Notification */}
            {notification && (
              <div
                className={`text-white text-center py-3 px-6 rounded-md mb-6 text-lg ${notification.type === "success" ? "bg-green-600" : "bg-red-600"
                  }`}
              >
                {notification.message}
              </div>
            )}

            {/* Agreement Body */}
            <div className="space-y-6 text-lg leading-relaxed text-gray-800">
              <p>
                This Agreement is made on this <span className="font-semibold">____ day of __________, 20__</span>,
                by and between:
              </p>

              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-xl">
                  <strong className="text-indigo-700">Investor:</strong> {commitment.investor.firstName}{" "}
                  {commitment.investor.lastName}
                </p>
                <p className="text-xl mt-2">
                  <strong className="text-indigo-700">Innovator:</strong> {commitment.innovator.firstName}{" "}
                  {commitment.innovator.lastName}
                </p>
              </div>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">1. Purpose</h2>
              <p>The purpose of this Agreement is to establish a commitment for the project titled:</p>
              <p className="text-2xl font-semibold text-indigo-600 mt-1">{commitment.project}</p>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">2. Project Details</h2>
              <p>The Project involves the development and commercialization of innovative solutions.</p>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">3. Financial Commitment</h2>
              <p>The Investor agrees to provide financial support amounting to:</p>
              <p className="text-3xl font-bold text-green-600">${commitment.amount}</p>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">4. Milestones</h2>
              <p>The following milestones have been agreed upon:</p>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2 text-lg">
                {commitment.milestones.map((milestone, index) => (
                  <li key={index} className="pl-2">{milestone}</li>
                ))}
              </ul>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">5. Confidentiality</h2>
              <p>
                Both parties agree to maintain the confidentiality of all proprietary and sensitive
                information disclosed during the term of this agreement.
              </p>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">6. Dispute Resolution</h2>
              <p>
                Any disputes arising under this Agreement shall be resolved amicably through arbitration
                in accordance with the applicable laws.
              </p>

              <h2 className="mt-8 font-bold text-2xl text-gray-900">7. Signatures</h2>

              <div className="mt-6 bg-gray-100 p-6 rounded-lg">
                <strong className="text-indigo-700 text-lg">Investor Signature:</strong>{" "}
                {commitment.investorSignature ? (
                  <span className="text-green-600 font-semibold text-xl">
                    {commitment.investorSignature} ✅
                  </span>
                ) : (
                  "____________________________"
                )}
              </div>

              <div className="mt-6 bg-gray-100 p-6 rounded-lg">
                <strong className="text-indigo-700 text-lg">Innovator Signature:</strong>{" "}
                {commitment.innovatorSignature ? (
                  <span className="text-green-600 font-semibold text-xl">
                    {commitment.innovatorSignature} ✅
                  </span>
                ) : (
                  "____________________________"
                )}
              </div>
            </div>

            {/* Signature Input (Only if user hasn't signed yet) */}
            {
              model && (
                !commitment.investorSignature || !commitment.innovatorSignature ? (
                  <div className="mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-2xl font-semibold text-gray-800">Sign Agreement</h3>
                    <label className="block text-lg font-medium text-gray-700 mt-3">
                      {role === "investor" ? "Investor Signature" : "Innovator Signature"}
                    </label>
                    <input
                      type="text"
                      className="mt-3 block w-full border border-gray-300 rounded-md p-3 text-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Type your full name as signature"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                    />
                    <div className="mt-6 flex justify-end gap-5">
                      <button
                        className="px-5 py-3 bg-gray-500 text-white text-lg rounded-md hover:bg-gray-600 transition"
                        onClick={() => setSignature("")}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-5 py-3 bg-green-600 text-white text-lg rounded-md hover:bg-green-700 transition flex items-center gap-2"
                        onClick={handleSignCommitment}
                      >
                        <FaPen size={20} /> Agree & Sign
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center mt-6 text-2xl text-green-600 font-semibold">
                    ✅ This commitment has been fully signed.
                  </p>
                )
              )
            }


            {/* PDF Download Button */}
            <div className="mt-10 flex justify-end">
              <button
                onClick={handleDownloadPDF}
                className="px-5 py-3 bg-gray-800 text-white text-lg rounded-md flex items-center gap-2 transition hover:bg-gray-900"
              >
                <FaFilePdf size={22} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

    </UserLayout>
  );
};

export default Commitment;
