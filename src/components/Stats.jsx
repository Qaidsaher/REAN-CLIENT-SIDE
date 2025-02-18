// websiteService.js

import { getCounts } from "../services/websiteService";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaProjectDiagram, FaLightbulb, FaLayerGroup } from "react-icons/fa";

// AnimatedNumber component for counting animation
const AnimatedNumber = ({ targetValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        start = targetValue;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{count.toLocaleString()}</span>;
};

// Stats Component using getCounts API from websiteServices
const Stats = () => {
  const [counts, setCounts] = useState({
    investors: 0,
    innovators: 0,
    investments: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getCounts();
        setCounts(data);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      }
    };
    fetchCounts();
  }, []);

  const statsData = [
    { title: "Investors", value: counts.investors, icon: <FaUsers className="w-16 h-16 mb-4 text-indigo-600" /> },
    { title: "Innovators", value: counts.innovators, icon: <FaLightbulb className="w-16 h-16 mb-4 text-indigo-600" /> },
    { title: "Investments", value: counts.investments, icon: <FaProjectDiagram className="w-16 h-16 mb-4 text-indigo-600" /> },
    { title: "Categories", value: counts.categories, icon: <FaLayerGroup className="w-16 h-16 mb-4 text-indigo-600" /> },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Key Metrics That Drive Our <span className="text-indigo-600">Success</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-all transform hover:shadow-xl"
            >
              {stat.icon}
              <p className="text-4xl font-bold text-gray-900">
                <AnimatedNumber targetValue={stat.value} />
              </p>
              <p className="text-gray-600 text-lg mt-2">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;