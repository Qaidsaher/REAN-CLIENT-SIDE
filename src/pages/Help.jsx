import React, { useState } from "react";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhone,
  FaBookOpen,
  FaShieldAlt,
  FaUsers,
  FaLifeRing,
} from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const faqs = [
  {
    question: "How can I invest in a project?",
    answer:
      "To invest, go to the 'Investments' section, browse available projects, and click on the 'Invest Now' button. You can then choose the amount and confirm your investment.",
  },
  {
    question: "How do I create an innovation?",
    answer:
      "Innovators can submit their projects through the 'Innovations' section. Click on 'Add New Innovation,' fill in the required details, and submit your project for review.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes, we use advanced security measures and encryption to protect your data. Your personal details are never shared without your consent.",
  },
  {
    question: "Can I chat with investors or innovators?",
    answer:
      "Yes, our integrated chat system allows you to communicate directly with investors and innovators. Visit the 'Chat' section to start a conversation.",
  },
  {
    question: "How do I withdraw my investment earnings?",
    answer:
      "You can withdraw funds from the 'Investments' dashboard. Click on 'Withdraw Earnings,' enter your details, and complete the process securely.",
  },
];

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            How Can We <span className="text-indigo-600">Help?</span>
          </h2>

          {/* ✅ Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
            {[
              { title: "FAQs", icon: <FaQuestionCircle />, link: "#faqs" },
              { title: "User Guides", icon: <FaBookOpen />, link: "#guides" },
              { title: "Security & Policies", icon: <FaShieldAlt />, link: "#policies" },
            ].map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center transition hover:shadow-lg hover:text-indigo-600"
              >
                <div className="text-4xl text-indigo-500 mb-3">{category.icon}</div>
                <p className="text-xl font-semibold">{category.title}</p>
              </a>
            ))}
          </div>

          {/* ✅ FAQ Section */}
          <div id="faqs" className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FaQuestionCircle className="text-indigo-600" /> Frequently Asked Questions
            </h3>

            {/* ✅ FAQ Items */}
            <div className="space-y-4">
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
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Guides & Policies Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* ✅ Guides */}
            <div id="guides" className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBookOpen className="text-indigo-600" /> User Guides
              </h3>
              <ul className="space-y-2">
                {[
                  { title: "Investor Guide", link: "/investor-guide" },
                  { title: "Innovation Submission Guide", link: "/innovation-guide" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-700 hover:text-indigo-600 transition-all"
                    >
                      ➜ {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ Policies */}
            <div id="policies" className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-indigo-600" /> Security & Policies
              </h3>
              <ul className="space-y-2">
                {[
                  { title: "Privacy Policy", link: "/privacy-policy" },
                  { title: "Terms & Conditions", link: "/terms" },
                  { title: "Community Guidelines", link: "/community-guidelines" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="text-gray-700 hover:text-indigo-600 transition-all"
                    >
                      ➜ {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ Contact Support Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mt-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need More Help?
            </h3>
            <p className="text-gray-600 mb-6">
              If you couldn't find the answer to your question, feel free to
              contact us.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
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

export default Help;
