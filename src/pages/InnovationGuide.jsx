import React from "react";
import UserLayout from "../layouts/UserLayout";

const InnovationGuide = () => {
  return (
    <UserLayout selectedPage={"help"}>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* ✅ Page Header */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Innovation <span className="text-indigo-600">Submission Guide</span>
          </h2>

          {/* ✅ Introduction */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              1. What is an Innovation?
            </h3>
            <p className="text-gray-700">
              An innovation is a new idea, method, or device that offers 
              improvements in technology, business, or any field of interest. 
              On REAN, innovators can showcase their groundbreaking ideas, 
              attract investors, and collaborate with industry experts.
            </p>
          </div>

          {/* ✅ Steps to Submit an Innovation */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Steps to Submit Your Innovation
            </h3>
            <ul className="text-gray-700 list-decimal pl-6">
              <li>
                <strong>Log in</strong>: Ensure you have a verified innovator 
                account.
              </li>
              <li>
                <strong>Navigate to "Innovations"</strong>: Go to your 
                dashboard and click on the "Innovations" tab.
              </li>
              <li>
                <strong>Click "Add New Innovation"</strong>: Start a new 
                submission.
              </li>
              <li>
                <strong>Fill in Required Details</strong>: Provide a 
                <span className="text-indigo-600 font-medium"> title, 
                description, industry category, estimated funding required, 
                and relevant media (images, videos, documents).</span>
              </li>
              <li>
                <strong>Submit for Review</strong>: Once completed, click 
                "Submit" and wait for approval.
              </li>
            </ul>
          </div>

          {/* ✅ Tips for Approval */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Tips for a Successful Submission
            </h3>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <strong>Provide a Clear and Compelling Description:</strong> 
                Investors need to understand the impact of your idea.
              </li>
              <li>
                <strong>Use High-Quality Media:</strong> Upload detailed images, 
                videos, or concept designs.
              </li>
              <li>
                <strong>Define Your Target Market:</strong> Describe your 
                potential customers and the market need.
              </li>
              <li>
                <strong>Be Transparent About Funding Needs:</strong> Clearly 
                state how much funding is required and how it will be used.
              </li>
            </ul>
          </div>

          {/* ✅ Managing and Updating Innovations */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Managing and Updating Your Innovation
            </h3>
            <p className="text-gray-700">
              Once your innovation is submitted, you can track its progress 
              in the "My Innovations" section. You can also:
            </p>
            <ul className="text-gray-700 list-disc pl-6">
              <li>Edit and update details if necessary.</li>
              <li>Engage with potential investors through the chat feature.</li>
              <li>Monitor investor interest and funding progress.</li>
            </ul>
          </div>

          {/* ✅ Approval & Rejection Process */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Approval & Rejection Process
            </h3>
            <p className="text-gray-700">
              Innovations go through an approval process to ensure they meet 
              the REAN guidelines. If your innovation is:
            </p>
            <ul className="text-gray-700 list-disc pl-6">
              <li>
                <span className="text-green-600 font-medium">Approved:</span> 
                You will be notified, and your innovation will be visible 
                to investors.
              </li>
              <li>
                <span className="text-red-600 font-medium">Rejected:</span> 
                You will receive feedback on what needs improvement. You 
                can edit and resubmit.
              </li>
            </ul>
          </div>

          {/* ✅ Connecting with Investors */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Connecting with Investors
            </h3>
            <p className="text-gray-700">
              Once your innovation is approved, investors can view it, 
              express interest, and connect with you via the platform’s 
              messaging system. You can:
            </p>
            <ul className="text-gray-700 list-disc pl-6">
              <li>Negotiate funding terms with interested investors.</li>
              <li>Receive offers and investment proposals.</li>
              <li>Provide updates and additional documentation if required.</li>
            </ul>
          </div>

          {/* ✅ Need More Help? */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Need More Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have further questions about submitting an innovation, 
              contact our support team.
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

export default InnovationGuide;
