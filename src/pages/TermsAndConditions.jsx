import React from "react";
import UserLayout from "../layouts/UserLayout";

const TermsAndConditions = () => {
  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Terms & <span className="text-indigo-600">Conditions</span>
          </h2>

          {/* ✅ Introduction */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h3>
            <p className="text-gray-700">
              Welcome to REAN. By accessing or using our platform, you agree to be 
              bound by these Terms & Conditions. If you do not agree with any part of 
              these terms, you may not use our services.
            </p>
          </div>

          {/* ✅ User Responsibilities */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              2. User Responsibilities
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>Users must provide accurate and complete registration details.</li>
              <li>Investors and innovators must comply with financial regulations.</li>
              <li>Users must not engage in fraudulent or illegal activities.</li>
            </ul>
          </div>

          {/* ✅ Investment & Innovation Rules */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Investment & Innovation Rules
            </h3>
            <p className="text-gray-700">
              All investments made on our platform are subject to due diligence. 
              Innovations must be original, legal, and align with our ethical guidelines.
            </p>
          </div>

          {/* ✅ Liability & Disclaimer */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Liability & Disclaimer
            </h3>
            <p className="text-gray-700">
              REAN does not guarantee profits or returns. Users invest at their own 
              risk. We are not liable for any losses or damages incurred.
            </p>
          </div>

          {/* ✅ Contact for Legal Issues */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need Legal Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any legal concerns, contact us at:
            </p>
            <a
              href="mailto:legal@rean.com"
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-all"
            >
              legal@rean.com
            </a>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default TermsAndConditions;
