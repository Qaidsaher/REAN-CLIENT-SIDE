import React from "react";
import { FaUsers, FaLightbulb, FaGlobe } from "react-icons/fa6"; // Icons for better aesthetics

const audienceData = [
  { title: "Digital Ideators", icon: <FaLightbulb size={50} /> },
  { title: "Creators", icon: <FaUsers size={50} /> },
  { title: "Digital Entrepreneurs", icon: <FaGlobe size={50} /> },
];

const TargetedAudience = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Section Heading */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Targeted Audience
        </h2>

        {/* ✅ Audience Cards (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {audienceData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {/* ✅ Icon / Image */}
              <div className="text-indigo-600 mb-4">{item.icon}</div>

              {/* ✅ Divider */}
              <div className="w-16 h-1 bg-indigo-500 rounded-full mb-4"></div>

              {/* ✅ Title */}
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetedAudience;
