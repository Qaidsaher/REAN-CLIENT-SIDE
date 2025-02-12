// // src/pages/LandingPage.jsx
// import React from "react";
// import Hero from "../components/Hero";
// import TargetedAudience from "../components/TargetedAudience";
// import Areas from "../components/Areas";
// import Stats from "../components/Stats";
// import Contact from "../components/Contact";
// import { About } from "../components/About";
// import Investors from "../components/Investors";
// import GuestLayout from "../layouts/GuestLayout";
// const LandingPage = () => (
//   <div className="min-h-screen">
//     <GuestLayout>
//       <Hero />
//       <About />
//       <TargetedAudience />
//       <Investors />
//       <Areas />
//       <Stats />
//       <Contact />
//     </GuestLayout>
//   </div>
// );

// export default LandingPage;
import React from "react";
import Hero from "../components/Hero";
import TargetedAudience from "../components/TargetedAudience";
import Areas from "../components/Areas";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import { About } from "../components/About";
import Investors from "../components/Investors";
import GuestLayout from "../layouts/GuestLayout";
import Innovation from "../components/Innovation";

const LandingPage = () => (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <GuestLayout>
      {/* Hero Section (Dark Background) */}
      <Hero />
      {/* About Section (White Background for Contrast) */}
      <About />
      {/* Targeted Audience (Gray Background for Soft Contrast) */}{" "}
      <TargetedAudience />
      {/* Investors Section (Indigo Background for Emphasis) */}
      <Investors />
      <Innovation/>
      {/* Areas Section (White Background for Separation) */}
      <Areas />
      {/* Stats Section (Gray-100 Background for Readability) */}
      <Stats />
      {/* Contact Section (Indigo for Attention) */}
      <Contact />
    </GuestLayout>
  </div>
);

export default LandingPage;
