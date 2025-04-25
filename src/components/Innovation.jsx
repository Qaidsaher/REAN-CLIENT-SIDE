// import React from "react";
// import { FaUser, FaDollarSign, FaEye, FaRocket } from "react-icons/fa";

// // ✅ Sample Innovations Data (Replace with API data later)
// const innovations = [
//   {
//     id: 1,
//     name: "AI-Powered Assistant",
//     creator: "John Doe",
//     funding: 12000,
//     image: "https://source.unsplash.com/600x400/?ai,technology",
//   },
//   {
//     id: 2,
//     name: "Blockchain Security",
//     creator: "Jane Smith",
//     funding: 8500,
//     image: "https://source.unsplash.com/600x400/?blockchain,security",
//   },
//   {
//     id: 3,
//     name: "Renewable Energy Solution",
//     creator: "Michael Brown",
//     funding: 15000,
//     image: "https://source.unsplash.com/600x400/?solar,energy",
//   },
  
// ];

// const Innovation = () => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* ✅ Section Title */}
//         <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
//           Discover <span className="text-indigo-600">Innovations</span>
//         </h2>

//         {/* ✅ Innovations Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {innovations.map((innovation) => (
//             <div
//               key={innovation.id}
//               className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
//             >
//               {/* ✅ Innovation Image */}
//               <img
//                 src={innovation.image}
//                 alt={innovation.name}
//                 className="w-full h-56 object-cover rounded-t-lg"
//               />

//               {/* ✅ Innovation Details */}
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold text-gray-900">
//                   {innovation.name}
//                 </h3>

//                 <p className="mt-2 flex items-center text-gray-600">
//                   <FaUser className="text-indigo-500 mr-2" /> {innovation.creator}
//                 </p>

//                 <p className="mt-2 flex items-center text-gray-600">
//                   <FaDollarSign className="text-green-500 mr-2" /> ${innovation.funding.toLocaleString()} Funded
//                 </p>

//                 {/* ✅ Buttons */}
//                 <div className="mt-4 flex justify-between items-center">
//                   <a
//                     href="#"
//                     className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg transition-all hover:bg-indigo-700 hover:scale-105"
//                   >
//                     View Details
//                   </a>

//                   <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
//                     <FaEye className="mr-1" /> Preview
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ Floating Icon Badge */}
//               <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-lg">
//                 <FaRocket className="inline-block mr-1" /> Trending
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-10 text-center">
//           <a
//             href="#"
//             className="text-indigo-600 text-lg font-semibold transition transform hover:underline hover:scale-105"
//           >
//             See All Innovations →
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Innovation;
// websiteService.js
import { getRandomInnovations } from "../services/websiteService";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaDollarSign, FaEye, FaRocket } from "react-icons/fa";

// Innovations Component using getRandomInnovations API
const Innovation = () => {
  const [innovations, setInnovations] = useState([]);

  useEffect(() => {
    const fetchInnovations = async () => {
      try {
        const data = await getRandomInnovations();
       
        setInnovations(data);
      } catch (error) {
        console.error("Failed to fetch innovations:", error);
      }
    };
    fetchInnovations();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Discover <span className="text-indigo-600">Innovations</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((innovation) => (
            <motion.div
              key={innovation.id}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={innovation.image}
                alt={innovation.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {innovation.name}
                </h3>
                <p className="mt-2 flex items-center text-gray-600">
                  <FaUser className="text-indigo-500 mr-2" /> 
                  {innovation.createdBy.firstName}{" "}
                  {innovation.createdBy.lastName}
                </p>
                <p className="mt-2 flex items-center text-gray-600">
                  <FaDollarSign className="text-green-500 mr-2" /> 
                  ${innovation.cost} Funded
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href="/innovations"
                    className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg transition-all hover:bg-indigo-700 hover:scale-105"
                  >
                    View Details
                  </a>
                  <button className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
                    <FaEye className="mr-1" /> Preview
                  </button>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-lg">
                <FaRocket className="inline-block mr-1" /> Trending
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#"
            className="text-indigo-600 text-lg font-semibold transition transform hover:underline hover:scale-105"
          >
            See All Innovations →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Innovation;