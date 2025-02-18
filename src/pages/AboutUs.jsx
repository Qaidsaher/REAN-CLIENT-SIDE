import React from "react";
import {
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaRocket,
  FaGlobe,
  FaRegSmile,
} from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";

const AboutUs = () => {
  return (
    <UserLayout selectedPage={"about-us"}>
      <section className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
            About <span className="text-indigo-600">Us</span>
          </h2>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to bridge the gap between innovators and investors by providing a
                secure, user-friendly platform for collaboration, investment, and growth.
                Our mission is to foster innovation, drive economic development, and
                create a global community of visionary minds.
              </p>
            </div>
            <div className="flex justify-center">
              <FaRocket className="text-indigo-600 text-7xl animate-bounce" />
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{
                title: "Innovation",
                icon: <FaLightbulb className="text-yellow-500 text-6xl mb-4" />,
                description: "We encourage groundbreaking ideas that solve real-world problems.",
              },
              {
                title: "Collaboration",
                icon: <FaHandshake className="text-green-500 text-6xl mb-4" />,
                description: "We believe in the power of teamwork and diverse perspectives.",
              },
              {
                title: "Integrity",
                icon: <FaRegSmile className="text-blue-500 text-6xl mb-4" />,
                description: "We uphold the highest standards of trust and transparency.",
              }].map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all text-center border border-gray-200"
                >
                  {value.icon}
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
            <div className="flex justify-center">
              <FaGlobe className="text-green-500 text-7xl animate-spin-slow" />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Global Impact</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform has facilitated numerous successful collaborations across
                continents. With members from over 50 countries, we're proud to contribute
                to the worldwide innovation ecosystem.
              </p>
            </div>
          </div>

          {/* Teamwork */}
          <div className="text-center">
            <FaUsers className="text-purple-600 text-7xl mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              We are a passionate group of developers, designers, and innovators united
              by a common goal: empowering ideas that can shape the future.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-10 text-center">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all">
              Join Us Today
            </button>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default AboutUs;
