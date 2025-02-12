import React, { useState } from "react";
import {
  FaLightbulb,
  FaMoneyBillWave,
  FaHandshake,
  FaShieldAlt,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const faqs = [
  {
    question: "How do I start investing?",
    answer:
      "Sign up as an investor, verify your profile, browse innovations, and choose a project to invest in. You can invest securely through our platform.",
  },
  {
    question: "What are the risks of investing?",
    answer:
      "Every investment carries risks, including potential losses. Always evaluate projects carefully, review business plans, and diversify your portfolio.",
  },
  {
    question: "How do I withdraw my earnings?",
    answer:
      "You can withdraw funds from your investor dashboard. Click 'Withdraw Earnings,' enter your payment details, and confirm the transaction.",
  },
  {
    question: "How do I communicate with innovators?",
    answer:
      "You can chat with innovators through our integrated messaging system. Visit the 'Chat' section to start a conversation with project owners.",
  },
];

const InvestorGuide = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Investor <span className="text-indigo-600">Guide</span>
          </h2>

          {/* ✅ Introduction */}
          <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-indigo-600" /> Introduction to Investing
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Investing in innovative projects is an exciting opportunity to fund groundbreaking ideas and generate potential returns. 
              Our platform connects investors with passionate innovators, allowing you to support projects that align with your interests and goals.
            </p>
          </div>

          {/* ✅ Investment Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Step 1: Explore Innovations",
                description:
                  "Browse the latest innovations and select projects that align with your investment interests.",
                icon: <FaLightbulb />,
              },
              {
                title: "Step 2: Review & Invest",
                description:
                  "Analyze project details, review funding requirements, and make informed investment decisions.",
                icon: <FaMoneyBillWave />,
              },
              {
                title: "Step 3: Monitor Growth",
                description:
                  "Track your investments, communicate with innovators, and manage your portfolio from the dashboard.",
                icon: <FaHandshake />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="text-4xl text-indigo-600 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>

          {/* ✅ Security & Compliance */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-indigo-600" /> Security & Compliance
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We prioritize security and compliance to ensure safe transactions and protect investor data. 
              Our platform implements robust security protocols, including identity verification, encrypted transactions, and fraud detection mechanisms.
            </p>
          </div>

          {/* ✅ FAQs Section */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaQuestionCircle className="text-indigo-600" /> Frequently Asked Questions
            </h3>

            {/* ✅ FAQ Items */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-indigo-600 transition-all"
                  >
                    {faq.question}
                    {openFaq === index ? (
                      <FaChevronUp className="text-indigo-600" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Contact Support */}
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need More Help?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any further questions, feel free to contact our support team.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:support@rean.com"
                className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-all"
              >
                <FaEnvelope /> support@rean.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-all"
              >
                <FaPhone /> +1 234 567 890
              </a>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default InvestorGuide;
