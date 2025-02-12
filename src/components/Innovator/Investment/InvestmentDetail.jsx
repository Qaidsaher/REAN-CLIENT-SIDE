// src/components/Innovator/Investment/InvestmentDetail.js
import React from "react";

const InvestmentDetail = () => {
  // Dummy data for investment detail
  const investment = {
    id: 1,
    innovation: "Innovation One",
    amount: "$10000",
    status: "Pending",
    details:
      "Detailed description of the investment, including terms, conditions, and any commitments.",
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        {investment.innovation}
      </h2>
      <p className="text-gray-700 mb-2">
        <strong>Amount:</strong> {investment.amount}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Status:</strong> {investment.status}
      </p>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Investment Details
        </h3>
        <p className="text-gray-700">{investment.details}</p>
      </div>
    </div>
  );
};

export default InvestmentDetail;
