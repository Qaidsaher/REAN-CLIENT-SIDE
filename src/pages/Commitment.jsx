import React, { useState } from "react";
import { FaFilePdf, FaEye, FaPen, FaTimesCircle } from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

// Sample dataset for a one‑on‑one innovation commitment.
const initialCommitments = [
  {
    id: 1,
    investor: "John Doe",
    innovator: "Sarah Smith",
    project: "AI-Powered Healthcare",
    amount: "$50,000",
    // Status values: "Pending", "Investor Signed", "Approved", "Rejected"
    status: "Pending",
    investorSignature: null,
    innovatorSignature: null,
  },
];

const Commitment = () => {
  const [commitments, setCommitments] = useState(initialCommitments);
  // Instead of showing a modal, we use selectedCommitment to decide whether to show the detail page.
  const [selectedCommitment, setSelectedCommitment] = useState(null);
  // pageMode can be "view" (read‑only) or "sign" (with input).
  const [pageMode, setPageMode] = useState("view");
  // signingParty indicates which party is signing ("investor" or "innovator")
  const [signingParty, setSigningParty] = useState(null);
  // For storing signature input.
  const [signatureInput, setSignatureInput] = useState("");

  // Helper: Returns the latest version of the selected commitment.
  const getCurrentCommitment = () => {
    return (
      commitments.find((c) => c.id === selectedCommitment?.id) ||
      selectedCommitment
    );
  };

  // Opens the commitment detail view.
  // When mode === "sign", the signingParty ("investor" or "innovator") is set.
  const handleOpenPage = (commitment, mode, party = null) => {
    setSelectedCommitment(commitment);
    setPageMode(mode);
    if (mode === "sign") {
      setSigningParty(party);
    } else {
      setSigningParty(null);
    }
  };

  // Closes the detail view and resets state.
  const handleClosePage = () => {
    setSelectedCommitment(null);
    setPageMode("view");
    setSigningParty(null);
    setSignatureInput("");
  };

  // When a party signs, update the corresponding signature and status.
  const handleSignCommitment = () => {
    if (!signatureInput.trim()) {
      alert("Please provide your signature (your full name).");
      return;
    }
    setCommitments((prev) =>
      prev.map((commitment) => {
        if (commitment.id === selectedCommitment.id) {
          if (signingParty === "investor") {
            return {
              ...commitment,
              investorSignature: signatureInput,
              status: "Investor Signed",
            };
          } else if (signingParty === "innovator") {
            return {
              ...commitment,
              innovatorSignature: signatureInput,
              status: "Approved",
            };
          }
        }
        return commitment;
      })
    );
    handleClosePage();
  };

  // Rejecting a commitment sets its status to "Rejected"
  const handleReject = (id) => {
    setCommitments((prev) =>
      prev.map((commitment) =>
        commitment.id === id
          ? { ...commitment, status: "Rejected" }
          : commitment
      )
    );
  };

  const handleDownloadPDF = () => {
    alert("PDF Download Started! (Functionality to be implemented)");
  };

  // Renders the full (dynamic) agreement text.
  const AgreementText = ({ commitment }) => {
    return (
      <div className="text-gray-800">
        <h1 className="text-center font-bold text-2xl mb-4">
          INNOVATION COMMITMENT AGREEMENT
        </h1>
        <p>
          This Agreement is made on this ___ day of __________, 20__, by and
          between:
        </p>
        <p className="mt-2">
          <strong>Investor:</strong> {commitment.investor}
        </p>
        <p className="mt-2">
          <strong>Innovator:</strong> {commitment.innovator}
        </p>
        <p className="mt-2">Collectively referred to as the "Parties".</p>

        <h2 className="mt-4 font-bold">1. PURPOSE</h2>
        <p>
          The purpose of this Agreement is to establish a commitment for the
          innovation project titled "{commitment.project}".
        </p>

        <h2 className="mt-4 font-bold">2. PROJECT DETAILS</h2>
        <p>
          The Project involves the development and commercialization of
          innovative solutions in healthcare.
        </p>

        <h2 className="mt-4 font-bold">3. INVESTOR'S COMMITMENT</h2>
        <p>
          The Investor agrees to provide financial support amounting to{" "}
          {commitment.amount} and strategic guidance.
        </p>

        <h2 className="mt-4 font-bold">4. INNOVATOR'S COMMITMENT</h2>
        <p>
          The Innovator agrees to develop and execute the project, ensuring
          timely delivery of milestones and transparency in progress.
        </p>

        <h2 className="mt-4 font-bold">5. TIMELINE & MILESTONES</h2>
        <p>
          The project milestones and timelines will be mutually agreed upon by
          the Parties.
        </p>

        <h2 className="mt-4 font-bold">6. TERMINATION</h2>
        <p>
          This Agreement may be terminated by mutual consent or due to
          non-fulfillment of the commitments herein.
        </p>

        <h2 className="mt-4 font-bold">7. DISPUTE RESOLUTION</h2>
        <p>
          Any disputes arising under this Agreement shall be resolved through
          arbitration in accordance with applicable laws.
        </p>

        <h2 className="mt-4 font-bold">8. CONFIDENTIALITY</h2>
        <p>
          Both Parties agree to maintain confidentiality regarding all aspects
          of the project.
        </p>

        <h2 className="mt-4 font-bold">9. GOVERNING LAW</h2>
        <p>
          This Agreement shall be governed by and construed in accordance with
          the laws of the relevant jurisdiction.
        </p>

        <h2 className="mt-4 font-bold">10. SIGNATURES</h2>
        <p className="mt-2">
          <strong>Investor:</strong>{" "}
          {commitment.investorSignature || "____________________________"}
          <br />
          {commitment.investor}
          <br />
          Date: __________
        </p>
        <p className="mt-2">
          <strong>Innovator:</strong>{" "}
          {commitment.innovatorSignature || "____________________________"}
          <br />
          {commitment.innovator}
          <br />
          Date: __________
        </p>
      </div>
    );
  };

  // If a commitment is selected, display the full agreement as a dedicated page.
  if (selectedCommitment) {
    const currentCommitment = getCurrentCommitment();
    return (
      <UserLayout selectedPage="commitments">
        <section className="py-16 bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto px-6">
            {/* Back Button */}
            <button
              onClick={handleClosePage}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              &larr; Back to Commitments
            </button>

            {/* Agreement Content */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AgreementText commitment={currentCommitment} />
            </div>

            {/* Signature Section (if in sign mode) */}
            {pageMode === "sign" && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <label className="block text-sm font-medium text-gray-700">
                  {signingParty === "investor"
                    ? "Investor Signature"
                    : "Innovator Signature"}
                </label>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Type your full name as signature"
                  value={signatureInput}
                  onChange={(e) => setSignatureInput(e.target.value)}
                />
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={handleClosePage}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignCommitment}
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Agree &amp; Sign
                  </button>
                </div>
              </div>
            )}

            {/* PDF Download Button (always visible) */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2 transition hover:bg-gray-800"
              >
                <FaFilePdf /> PDF
              </button>
            </div>
          </div>
        </section>
      </UserLayout>
    );
  }

  // Otherwise, show the list of commitments.
  return (
    <UserLayout selectedPage="commitments">
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Innovation Commitment
          </h2>

          {/* Commitment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commitments.map((commitment) => (
              <div
                key={commitment.id}
                className="bg-white shadow-md rounded-lg p-6 transition hover:shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {commitment.project}
                </h3>
                <p className="text-gray-600">
                  <strong>Investor:</strong> {commitment.investor}
                </p>
                <p className="text-gray-600">
                  <strong>Innovator:</strong> {commitment.innovator}
                </p>
                <p className="text-gray-600">
                  <strong>Amount:</strong> {commitment.amount}
                </p>
                <p
                  className={`text-lg font-semibold mt-2 ${
                    commitment.status === "Approved"
                      ? "text-green-600"
                      : commitment.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {commitment.status}
                </p>
                {(commitment.investorSignature ||
                  commitment.innovatorSignature) && (
                  <div className="mt-2 text-sm text-gray-600">
                    {commitment.investorSignature && (
                      <p>
                        <strong>Investor Signature:</strong>{" "}
                        {commitment.investorSignature}
                      </p>
                    )}
                    {commitment.innovatorSignature && (
                      <p>
                        <strong>Innovator Signature:</strong>{" "}
                        {commitment.innovatorSignature}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex mt-4 gap-3 flex-wrap">
                  {/* View full agreement (read‑only) */}
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 transition hover:bg-blue-700"
                    onClick={() => handleOpenPage(commitment, "view")}
                  >
                    <FaEye /> View Agreement
                  </button>

                  {/* Show sign buttons based on status */}
                  {commitment.status === "Pending" && (
                    <>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 transition hover:bg-green-700"
                        onClick={() =>
                          handleOpenPage(commitment, "sign", "investor")
                        }
                      >
                        <FaPen /> Investor Sign
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2 transition hover:bg-red-700"
                        onClick={() => handleReject(commitment.id)}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  )}

                  {commitment.status === "Investor Signed" && (
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 transition hover:bg-green-700"
                      onClick={() =>
                        handleOpenPage(commitment, "sign", "innovator")
                      }
                    >
                      <FaPen /> Innovator Sign
                    </button>
                  )}

                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2 transition hover:bg-gray-800"
                    onClick={handleDownloadPDF}
                  >
                    <FaFilePdf /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default Commitment;
