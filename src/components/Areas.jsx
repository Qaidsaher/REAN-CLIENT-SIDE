import React from "react";
import { FaLaptopCode, FaBriefcase, FaSeedling, FaUserMd } from "react-icons/fa";

const areas = [
  {
    title: "Technology",
    icon: <FaLaptopCode />,
    color: "bg-blue-100",
    borderColor: "border-blue-500",
    textColor: "text-blue-600",
    description:
      "Technology drives progress and helps solve complex problems. From AI to mobile apps, it's transforming industries worldwide.",
  },
  {
    title: "Medicine",
    icon: <FaUserMd />,
    color: "bg-green-100",
    borderColor: "border-green-500",
    textColor: "text-green-600",
    description:
      "Medicine advances healthcare, improves quality of life, and provides innovative treatments for various diseases and conditions.",
  },
  {
    title: "Agriculture",
    icon: <FaSeedling />,
    color: "bg-yellow-100",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-600",
    description:
      "Agriculture is the backbone of food production, ensuring sustainability through innovative farming and resource management.",
  },
  {
    title: "Business",
    icon: <FaBriefcase />,
    color: "bg-red-100",
    borderColor: "border-red-500",
    textColor: "text-red-600",
    description:
      "Business strategies shape industries, drive economies, and create opportunities for global innovation and entrepreneurship.",
  },
];

const Areas = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      {/* ✅ Section Title */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Our Focus Areas
      </h2>

      {/* ✅ Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {areas.map((area, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center p-6 ${area.color} rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
          >
            {/* ✅ Icon Section */}
            <div
              className={`w-16 h-16 flex items-center justify-center text-3xl rounded-full shadow-md ${area.textColor}`}
            >
              {area.icon}
            </div>

            {/* ✅ Content Section */}
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h3 className={`text-2xl font-semibold ${area.textColor}`}>
                {area.title}
              </h3>
              <p className="mt-2 text-gray-700">{area.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Areas;
// import React from "react";
// import { FaLaptopCode, FaBriefcase, FaSeedling, FaUserMd } from "react-icons/fa";

// const areas = [
//   {
//     title: "Technology",
//     icon: <FaLaptopCode />,
//     bgColor: "bg-blue-500",
//     textColor: "text-blue-100",
//     borderColor: "border-blue-300",
//     description:
//       "Technology drives progress and helps solve complex problems. From AI to mobile apps, it's transforming industries worldwide.",
//   },
//   {
//     title: "Medicine",
//     icon: <FaUserMd />,
//     bgColor: "bg-green-500",
//     textColor: "text-green-100",
//     borderColor: "border-green-300",
//     description:
//       "Medicine advances healthcare, improves quality of life, and provides innovative treatments for various diseases and conditions.",
//   },
//   {
//     title: "Agriculture",
//     icon: <FaSeedling />,
//     bgColor: "bg-yellow-500",
//     textColor: "text-yellow-100",
//     borderColor: "border-yellow-300",
//     description:
//       "Agriculture is the backbone of food production, ensuring sustainability through innovative farming and resource management.",
//   },
//   {
//     title: "Business",
//     icon: <FaBriefcase />,
//     bgColor: "bg-red-500",
//     textColor: "text-red-100",
//     borderColor: "border-red-300",
//     description:
//       "Business strategies shape industries, drive economies, and create opportunities for global innovation and entrepreneurship.",
//   },
// ];

// const Areas = () => (
//   <section className="relative py-16 bg-gray-100">
//     {/* ✅ Diagonal Background Effect */}
//     <div className="absolute top-0 left-0 w-full h-40 bg-indigo-600 transform -skew-y-6"></div>

//     <div className="relative max-w-7xl mx-auto px-6">
//       {/* ✅ Section Title */}
//       <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
//         Our Focus Areas
//       </h2>

//       {/* ✅ Areas Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {areas.map((area, index) => (
//           <div
//             key={index}
//             className={`p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
//           >
//             {/* ✅ Background Color Overlay */}
//             <div className={`${area.bgColor} absolute inset-0 opacity-90 rounded-lg`}></div>

//             {/* ✅ Content Section */}
//             <div className="relative z-10 flex flex-col items-center text-center">
//               <div
//                 className={`w-16 h-16 flex items-center justify-center text-4xl rounded-full shadow-md border-4 ${area.borderColor} ${area.textColor}`}
//               >
//                 {area.icon}
//               </div>
//               <h3 className="text-2xl font-semibold mt-4 text-white">
//                 {area.title}
//               </h3>
//               <p className="mt-2 text-gray-100 px-3">{area.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default Areas;
// import React from "react";
// import { FaLaptopCode, FaBriefcase, FaSeedling, FaUserMd } from "react-icons/fa";
// import { motion } from "framer-motion";

// const areas = [
//   {
//     title: "Technology",
//     icon: <FaLaptopCode />,
//     color: "bg-blue-100 dark:bg-blue-900",
//     textColor: "text-blue-600 dark:text-blue-300",
//     borderColor: "border-blue-500",
//     description:
//       "Technology drives progress, from AI to mobile apps. It is shaping the future and transforming industries worldwide.",
//   },
//   {
//     title: "Medicine",
//     icon: <FaUserMd />,
//     color: "bg-green-100 dark:bg-green-900",
//     textColor: "text-green-600 dark:text-green-300",
//     borderColor: "border-green-500",
//     description:
//       "Advancing healthcare with innovative research, modern treatments, and medical technology to improve global well-being.",
//   },
//   {
//     title: "Agriculture",
//     icon: <FaSeedling />,
//     color: "bg-yellow-100 dark:bg-yellow-900",
//     textColor: "text-yellow-600 dark:text-yellow-300",
//     borderColor: "border-yellow-500",
//     description:
//       "Enhancing food security through modern farming, sustainability, and agritech solutions for a better tomorrow.",
//   },
//   {
//     title: "Business",
//     icon: <FaBriefcase />,
//     color: "bg-red-100 dark:bg-red-900",
//     textColor: "text-red-600 dark:text-red-300",
//     borderColor: "border-red-500",
//     description:
//       "Entrepreneurship and financial strategies shape industries, drive economic growth, and create investment opportunities.",
//   },
// ];

// const Areas = () => {
//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* ✅ Section Title */}
//         <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
//           Explore Our Key Areas
//         </h2>

//         {/* ✅ Areas Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {areas.map((area, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               className={`relative p-6 rounded-xl shadow-md border-2 hover:border-opacity-100 border-opacity-30 transition-all duration-300 ${area.borderColor} ${area.color}`}
//             >
//               {/* ✅ Icon Section */}
//               <div
//                 className={`w-14 h-14 flex items-center justify-center text-3xl rounded-full ${area.textColor} shadow-lg`}
//               >
//                 {area.icon}
//               </div>

//               {/* ✅ Content Section */}
//               <h3 className={`text-2xl font-semibold mt-6 ${area.textColor}`}>
//                 {area.title}
//               </h3>
//               <p className="mt-3 text-gray-700 dark:text-gray-300">{area.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Areas;
// import React from "react";
// import { FaLaptopCode, FaBriefcase, FaSeedling, FaUserMd } from "react-icons/fa";
// import { motion } from "framer-motion";

// const areas = [
//   {
//     title: "Technology",
//     icon: <FaLaptopCode />,
//     bgColor: "bg-indigo-600",  // Indigo Background
//     textColor: "text-white",  // White Text
//     borderColor: "border-indigo-500",
//     description:
//       "Technology drives progress, from AI to mobile apps. It is shaping the future and transforming industries worldwide.",
//   },
//   {
//     title: "Medicine",
//     icon: <FaUserMd />,
//     bgColor: "bg-indigo-700",
//     textColor: "text-white",
//     borderColor: "border-indigo-500",
//     description:
//       "Advancing healthcare with innovative research, modern treatments, and medical technology to improve global well-being.",
//   },
//   {
//     title: "Agriculture",
//     icon: <FaSeedling />,
//     bgColor: "bg-indigo-600",
//     textColor: "text-white",
//     borderColor: "border-indigo-500",
//     description:
//       "Enhancing food security through modern farming, sustainability, and agritech solutions for a better tomorrow.",
//   },
//   {
//     title: "Business",
//     icon: <FaBriefcase />,
//     bgColor: "bg-indigo-700",
//     textColor: "text-white",
//     borderColor: "border-indigo-500",
//     description:
//       "Entrepreneurship and financial strategies shape industries, drive economic growth, and create investment opportunities.",
//   },
// ];

// const Areas = () => {
//   return (
//     <section className="py-16 bg-white dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* ✅ Section Title */}
//         <h2 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-12">
//           Explore Our Key Areas
//         </h2>

//         {/* ✅ Areas Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {areas.map((area, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.3 }}
//               className={`relative p-6 rounded-xl shadow-md border-2 hover:border-opacity-100 border-opacity-30 transition-all duration-300 ${area.borderColor} ${area.bgColor}`}
//             >
//               {/* ✅ Icon Section */}
//               <div
//                 className={`w-14 h-14 flex items-center justify-center text-3xl rounded-full ${area.textColor} shadow-lg`}
//               >
//                 {area.icon}
//               </div>

//               {/* ✅ Content Section */}
//               <h3 className={`text-2xl font-semibold mt-6 ${area.textColor}`}>
//                 {area.title}
//               </h3>
//               <p className="mt-3 text-gray-100">{area.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Areas;
