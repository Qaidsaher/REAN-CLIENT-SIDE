// src/pages/adminPages/ManageInvestors.js
import React from "react";
import Navbar from "../../components/Admin/Navbar";
import ManageInvestors from "../../components/Admin/ManageInvestors";

const Investors1 = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-4">
        <ManageInvestors />
      </section>
    </div>
  );
};

export default Investors1;
