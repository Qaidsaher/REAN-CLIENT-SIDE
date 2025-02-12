import React from "react";
import UserLayout from "../layouts/UserLayout";

const SecurityCompliance = () => {
  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Security & <span className="text-indigo-600">Compliance</span>
          </h2>

          {/* ✅ Introduction */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Our Commitment to Security
            </h3>
            <p className="text-gray-700">
              At REAN, we take security and compliance seriously. We follow the 
              latest industry standards to protect user data, transactions, and 
              communications on our platform.
            </p>
          </div>

          {/* ✅ Data Protection & Privacy */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Data Protection & Privacy
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Encryption:</strong> All user data is encrypted both in 
                transit and at rest using industry-leading encryption protocols.
              </li>
              <li>
                <strong>Access Control:</strong> Only authorized personnel have 
                access to sensitive information, and strict authentication 
                measures are in place.
              </li>
              <li>
                <strong>Privacy Policy Compliance:</strong> We adhere to global 
                privacy regulations such as GDPR and CCPA to protect user data.
              </li>
            </ul>
          </div>

          {/* ✅ Account Security Measures */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Account Security Measures
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Multi-Factor Authentication (MFA):</strong> Users can 
                enable MFA to add an extra layer of protection.
              </li>
              <li>
                <strong>Secure Login:</strong> We monitor login activity to 
                detect unauthorized access attempts.
              </li>
              <li>
                <strong>Automatic Logout:</strong> Inactive sessions are 
                automatically logged out for security reasons.
              </li>
            </ul>
          </div>

          {/* ✅ Fraud Prevention & Compliance */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Fraud Prevention & Compliance
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Transaction Monitoring:</strong> We actively monitor 
                transactions for suspicious activity.
              </li>
              <li>
                <strong>Know Your Customer (KYC):</strong> Investors and 
                innovators may be required to complete identity verification 
                processes.
              </li>
              <li>
                <strong>Anti-Money Laundering (AML) Policies:</strong> REAN 
                follows strict AML policies to prevent financial crimes.
              </li>
            </ul>
          </div>

          {/* ✅ Secure Payment & Transactions */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Secure Payment & Transactions
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>PCI DSS Compliance:</strong> All financial transactions 
                comply with the highest security standards.
              </li>
              <li>
                <strong>Escrow Protection:</strong> Investor funds are protected 
                in escrow until agreements are finalized.
              </li>
              <li>
                <strong>Fraudulent Transaction Detection:</strong> Our system 
                analyzes payments in real-time for potential fraud.
              </li>
            </ul>
          </div>

          {/* ✅ Reporting Security Issues */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Reporting Security Issues
            </h3>
            <p className="text-gray-700">
              If you notice any suspicious activity or security concerns, 
              please report them to our security team immediately. We have a 
              dedicated security response team to investigate and resolve issues.
            </p>
            <ul className="text-gray-700 list-disc pl-6 mt-4">
              <li>Email: <a href="mailto:security@rean.com" className="text-indigo-600 hover:text-indigo-800 transition-all">security@rean.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-800 transition-all">+1 234 567 890</a></li>
            </ul>
          </div>

          {/* ✅ Conclusion */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Stay Safe, Stay Secure!
            </h3>
            <p className="text-gray-600 mb-6">
              Your security is our top priority. By following best security 
              practices and staying vigilant, we can create a safe and 
              trustworthy environment for innovation and investment.
            </p>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default SecurityCompliance;
