import React from "react";
import { FaEnvelope, FaUser, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-16  flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white text-gray-900 shadow-xl rounded-lg p-8">
        {/* ✅ Section Title */}
        <h2 className="text-4xl font-bold text-center mb-8">
          Contact <span className="text-indigo-600">Us</span>
        </h2>

        {/* ✅ Contact Form */}
        <form className="space-y-6">
          {/* ✅ Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <FaUser className="absolute left-4 top-3 text-gray-500" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                placeholder="Your Name"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* ✅ Message Field */}
          <div className="relative">
            <FaCommentDots className="absolute left-4 top-4 text-gray-500" />
            <textarea
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 resize-none"
              rows="6"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* ✅ Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-indigo-700 hover:scale-105 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
