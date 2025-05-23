// import React from "react";
// import about from "../assets/images/image 9.svg";
// import { motion } from "framer-motion";
// export const About = () => {
//   return (
//     <section className="bg-gray-50 py-12 md:py-20">
//     <div className="max-w-7xl mx-auto px-6 lg:px-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//         {/* ✅ Left Side - Content */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
//             REAN: Where <span className="text-indigo-600">Ideas</span> &{" "}
//             <span className="text-indigo-600">Investments</span> Converge
//           </h2>
//           <p className="mt-4 text-lg text-gray-700 leading-relaxed">
//             Welcome to REAN, an innovative platform designed to connect visionaries
//             and investors. We offer a seamless experience where groundbreaking ideas
//             meet strategic funding to transform industries.
//           </p>

//           <div className="mt-6 flex flex-wrap gap-4">
//             <a
//               href="/explore"
//               className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition-all rounded-lg font-semibold shadow-md"
//             >
//               Explore Innovations
//             </a>
//             <a
//               href="/join"
//               className="px-6 py-3 text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all rounded-lg font-semibold shadow-md"
//             >
//               Join REAN
//             </a>
//           </div>
//         </motion.div>

//         {/* ✅ Right Side - Image */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <img
//             src={about}
//             className="rounded-xl shadow-lg w-full max-w-lg mx-auto"
//             alt="REAN Innovation"
//           />
//         </motion.div>
//       </div>
//     </div>
//   </section>
//   );
// };
// // import React from "react";
// // import about from "../assets/images/image9.svg";
// // import { motion } from "framer-motion";

// // export const About = () => {
// //   return (
// //     <section className="bg-gray-50 py-12 md:py-20">
// //       <div className="max-w-7xl mx-auto px-6 lg:px-12">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
// //           {/* ✅ Left Side - Content */}
// //           <motion.div
// //             initial={{ opacity: 0, x: -30 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
// //               REAN: Where <span className="text-indigo-600">Ideas</span> &{" "}
// //               <span className="text-indigo-600">Investments</span> Converge
// //             </h2>
// //             <p className="mt-4 text-lg text-gray-700 leading-relaxed">
// //               Welcome to REAN, an innovative platform designed to connect visionaries
// //               and investors. We offer a seamless experience where groundbreaking ideas
// //               meet strategic funding to transform industries.
// //             </p>

// //             <div className="mt-6 flex flex-wrap gap-4">
// //               <a
// //                 href="/explore"
// //                 className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition-all rounded-lg font-semibold shadow-md"
// //               >
// //                 Explore Innovations
// //               </a>
// //               <a
// //                 href="/join"
// //                 className="px-6 py-3 text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all rounded-lg font-semibold shadow-md"
// //               >
// //                 Join REAN
// //               </a>
// //             </div>
// //           </motion.div>

// //           {/* ✅ Right Side - Image */}
// //           <motion.div
// //             initial={{ opacity: 0, x: 30 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             <img
// //               src={about}
// //               className="rounded-xl shadow-lg w-full max-w-lg mx-auto"
// //               alt="REAN Innovation"
// //             />
// //           </motion.div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };
import React from "react";
import about from "../assets/images/image 9.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-12 md:py-20" dir="auto">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ✅ Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {t("about.title", {
              ideas: <span className="text-indigo-600">{t("about.ideas")}</span>,
              investments: <span className="text-indigo-600">{t("about.investments")}</span>
            })}
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            {t("about.description")}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/about-us"
              className="px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition-all rounded-lg font-semibold shadow-md"
            >
              {t("about.exploreButton")}
            </a>
            <a
              href="/join-by"
              className="px-6 py-3 text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all rounded-lg font-semibold shadow-md"
            >
              {t("about.joinButton")}
            </a>
          </div>
        </motion.div>

        {/* ✅ Right Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={about}
            className="rounded-xl shadow-lg w-full max-w-lg mx-auto"
            alt={t("about.imageAlt")}
          />
        </motion.div>
      </div>
    </div>
  </section>
  );
};

// Translation files:
// en.json
// {
//   "about": {
//     "title": "REAN: Where {{ideas}} & {{investments}} Converge",
//     "ideas": "Ideas",
//     "investments": "Investments",
//     "description": "Welcome to REAN, an innovative platform designed to connect visionaries and investors. We offer a seamless experience where groundbreaking ideas meet strategic funding to transform industries.",
//     "exploreButton": "Explore Innovations",
//     "joinButton": "Join REAN",
//     "imageAlt": "REAN Innovation"
//   }
// }

// ar.json
// {
//   "about": {
//     "title": "ريان: حيث تتلاقى {{ideas}} و{{investments}}",
//     "ideas": "الأفكار",
//     "investments": "الاستثمارات",
//     "description": "مرحبًا بك في ريان، المنصة المبتكرة التي تربط بين أصحاب الرؤى والمستثمرين. نقدم تجربة سلسة حيث تلتقي الأفكار الرائدة مع التمويل الاستراتيجي لتحويل الصناعات.",
//     "exploreButton": "استكشف الابتكارات",
//     "joinButton": "انضم إلى ريان",
//     "imageAlt": "ابتكارات ريان"
//   }
// }