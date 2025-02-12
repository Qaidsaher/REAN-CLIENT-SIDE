import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Default user profile icon
import { motion } from "framer-motion"; // For smooth animations

// ✅ Investors Data (Replace with API Data Later)
const investorsData = [
  {
    name: "Ruba Abdullrhman",
    description: "Investor specializing in AI, Blockchain, and Fintech startups.",
    image: "", // Placeholder for future image URL
  },
  {
    name: "Amjad Aseery",
    description: "Supporting early-stage businesses and tech-driven innovations.",
    image: "", // Placeholder for future image URL
  },
  {
    name: "Afnan Alqugtani",
    description: "Passionate about funding sustainable and green technologies.",
    image: "", // Placeholder for future image URL
  },
];

const Investors = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Section Header */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Meet Our <span className="text-indigo-600">Investors</span>
        </h2>

        {/* ✅ Investors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {investorsData.map((investor, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center transition-all transform hover:shadow-2xl"
            >
              {/* ✅ Profile Image / Icon */}
              {investor.image ? (
                <img
                  src={investor.image}
                  alt={investor.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                />
              ) : (
                <FaUserCircle className="text-indigo-500 text-7xl mb-4" />
              )}

              {/* ✅ Name & Description */}
              <h3 className="text-2xl font-semibold text-gray-900 text-center mt-2">
                {investor.name}
              </h3>
              <p className="mt-2 text-gray-600 text-center">{investor.description}</p>

              {/* ✅ View Profile Button */}
              <a
                href="#"
                className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium transition-all transform hover:scale-105 hover:shadow-lg"
              >
                View Profile
              </a>
            </motion.div>
          ))}
        </div>

        {/* ✅ "See All" Button */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="text-indigo-600 text-lg font-semibold transition transform hover:underline hover:scale-105"
          >
            See All Investors →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Investors;
