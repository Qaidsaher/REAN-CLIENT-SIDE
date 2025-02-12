import React from "react";
import UserLayout from "../layouts/UserLayout";

const PrivacyPolicy = () => {
  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Privacy <span className="text-indigo-600">Policy</span>
          </h2>

          {/* ✅ Data Collection */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Data Collection
            </h3>
            <p className="text-gray-700">
              We collect personal data such as name, email, investment history, and 
              project details when you use our platform.
            </p>
          </div>

          {/* ✅ How We Use Data */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              2. How We Use Your Data
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>To improve user experience and platform functionality.</li>
              <li>To verify users and ensure platform security.</li>
              <li>To facilitate investments and communication between users.</li>
            </ul>
          </div>

          {/* ✅ Data Protection & Security */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Data Protection & Security
            </h3>
            <p className="text-gray-700">
              We implement strong security measures, including encryption and 
              secure authentication, to protect your data from unauthorized access.
            </p>
          </div>

          {/* ✅ User Rights */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Your Rights & Control
            </h3>
            <p className="text-gray-700">
              You can request access to your personal data, update your information, 
              or delete your account at any time.
            </p>
          </div>

          {/* ✅ Third-Party Sharing */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Third-Party Sharing
            </h3>
            <p className="text-gray-700">
              We do not sell your data. However, we may share necessary information 
              with legal authorities or financial partners for compliance.
            </p>
          </div>

          {/* ✅ Contact for Privacy Concerns */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have concerns about your data, contact us at:
            </p>
            <a
              href="mailto:privacy@rean.com"
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-all"
            >
              privacy@rean.com
            </a>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default PrivacyPolicy;
