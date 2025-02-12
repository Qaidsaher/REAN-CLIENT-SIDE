// src/components/Innovator/Investment/InvestmentList.js
import React from "react";
import { Link } from "react-router-dom";

const InvestmentList = () => {
  const investments = [
    {
      id: 1,
      innovation: "Innovation One",
      amount: "$10000",
      status: "Pending",
    },
    {
      id: 2,
      innovation: "Innovation Two",
      amount: "$15000",
      status: "Approved",
    },
    {
      id: 3,
      innovation: "Innovation Three",
      amount: "$5000",
      status: "Rejected",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">My Investments</h2>
      <div className="space-y-4">
        {investments.map((inv) => (
          <Link
            to={`/investments/${inv.id}`}
            key={inv.id}
            className="block p-4 border border-gray-200 rounded hover:bg-gray-50 transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {inv.innovation}
            </h3>
            <p className="text-gray-600">
              <strong>Amount:</strong> {inv.amount}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {inv.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InvestmentList;
