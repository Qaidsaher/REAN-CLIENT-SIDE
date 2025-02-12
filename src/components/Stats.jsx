import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For smooth animations
import stat1 from "../assets/images/stats/stats (1).svg";
import stat2 from "../assets/images/stats/stats (2).svg";
import stat3 from "../assets/images/stats/stats (3).svg";
import stat4 from "../assets/images/stats/stats (4).svg";

// ✅ Statistics Data
const statsData = [
  { title: "Investors", value: 2301, image: stat2 },
  { title: "Visitors", value: 3231, image: stat4 },
  { title: "Projects", value: 3231, image: stat1 },
  { title: "Innovators", value: 346, image: stat3 },
];

const AnimatedNumber = ({ targetValue }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
    const increment = targetValue / (duration / 16); // Adjust for smooth animation

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        start = targetValue;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16); // Runs every 16ms for smooth animation

    return () => clearInterval(timer);
  }, [targetValue]);

  return <span>{count.toLocaleString()}</span>; // Format numbers with commas
};

const Stats = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* ✅ Section Title */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Key Metrics That Drive Our <span className="text-indigo-600">Success</span>
      </h2>

      {/* ✅ Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-all transform hover:shadow-xl"
          >
            {/* ✅ Stat Icon */}
            <img src={stat.image} alt={stat.title} className="w-16 h-16 mb-4" />

            {/* ✅ Animated Stat Number */}
            <p className="text-4xl font-bold text-gray-900">
              <AnimatedNumber targetValue={stat.value} />
            </p>

            {/* ✅ Stat Title */}
            <p className="text-gray-600 text-lg mt-2">{stat.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
