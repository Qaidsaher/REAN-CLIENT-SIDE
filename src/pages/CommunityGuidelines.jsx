import React from "react";
import UserLayout from "../layouts/UserLayout";

const CommunityGuidelines = () => {
  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Community <span className="text-indigo-600">Guidelines</span>
          </h2>

          {/* ✅ Introduction */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Purpose of Our Community
            </h3>
            <p className="text-gray-700">
              REAN is a platform where innovators, investors, and entrepreneurs 
              come together to share ideas, collaborate, and drive innovation 
              forward. These guidelines ensure a safe, respectful, and inclusive 
              environment for everyone.
            </p>
          </div>

          {/* ✅ General Conduct */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              2. General Conduct
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Be Respectful:</strong> Treat others with kindness and 
                professionalism. Discriminatory or offensive behavior will not 
                be tolerated.
              </li>
              <li>
                <strong>Stay Professional:</strong> Keep discussions and 
                interactions relevant to innovation, investments, and business.
              </li>
              <li>
                <strong>No Hate Speech or Harassment:</strong> Bullying, threats, 
                or intimidation are strictly prohibited.
              </li>
              <li>
                <strong>Keep Content Authentic:</strong> Misleading, false, or 
                spammy content is not allowed.
              </li>
            </ul>
          </div>

          {/* ✅ Innovation & Intellectual Property */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Innovation & Intellectual Property
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Respect Intellectual Property:</strong> Only submit ideas, 
                documents, or media that belong to you or have proper permissions 
                to use.
              </li>
              <li>
                <strong>Do Not Copy Others’ Work:</strong> Plagiarism and 
                unauthorized use of content are against our policies.
              </li>
              <li>
                <strong>Report Violations:</strong> If you see unauthorized use 
                of content, report it to our support team.
              </li>
            </ul>
          </div>

          {/* ✅ Investor & Innovator Interactions */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Investor & Innovator Interactions
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Be Transparent:</strong> Provide clear, accurate, and 
                honest information in your profile and innovation listings.
              </li>
              <li>
                <strong>Avoid Unethical Behavior:</strong> Any fraudulent or 
                deceptive behavior will result in immediate account suspension.
              </li>
              <li>
                <strong>Professional Communication:</strong> Keep conversations 
                professional and business-oriented.
              </li>
            </ul>
          </div>

          {/* ✅ Security & Privacy */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Security & Privacy
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Protect Your Personal Data:</strong> Do not share 
                sensitive or private information publicly.
              </li>
              <li>
                <strong>Use Strong Passwords:</strong> Always secure your account 
                with a strong password.
              </li>
              <li>
                <strong>Report Suspicious Activity:</strong> If you suspect 
                fraudulent behavior, report it to REAN immediately.
              </li>
            </ul>
          </div>

          {/* ✅ Consequences for Violations */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Consequences for Violations
            </h3>
            <p className="text-gray-700">
              Failure to follow these guidelines may result in the following:
            </p>
            <ul className="text-gray-700 list-disc pl-6">
              <li>Warnings or temporary account suspension.</li>
              <li>Permanent account ban for repeated or severe violations.</li>
              <li>Legal action in case of fraud or illegal activities.</li>
            </ul>
          </div>

          {/* ✅ Need Help? */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any concerns or need further clarification on our 
              community guidelines, contact our support team.
            </p>
            <a
              href="mailto:support@rean.com"
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-all"
            >
              support@rean.com
            </a>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default CommunityGuidelines;
