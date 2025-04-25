import React from "react";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6"; // React Icons for social media
import { useTranslation } from "react-i18next";
import hereImage from "../assets/images/hero.jpg"; 
const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <section className="relative bg-white text-gray-900 flex items-center px-6 py-16 lg:py-24" dir="auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

        {/* ✅ Left Section - Text & Call to Action */}
        <div className={`text-${isRtl ? "right" : "left"} max-w-xl`}>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            {t("hero.title")}
            <br />
            <span className="text-indigo-600">{t("hero.subtitle")}</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t("hero.description")}
          </p>

          {/* ✅ Call-to-Action Buttons */}
          <div className={`mt-6 flex flex-wrap  lg:justify-${isRtl ? "end" : "start"} gap-4`}>
            <a
              href="#"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg transition-all hover:bg-indigo-700 hover:scale-105 shadow-md"
            >
              {t("hero.joinButton")}
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-transparent border border-indigo-600 text-indigo-600 font-semibold rounded-lg transition-all hover:bg-indigo-600 hover:text-white shadow-md"
            >
              {t("hero.learnMoreButton")}
            </a>
          </div>

          {/* ✅ Social Media Icons */}
          <div className={`mt-6 flex   gap-4`}>
            {[
              { icon: <FaLinkedin size={24} />, href: "#" },
              { icon: <FaXTwitter size={24} />, href: "#" },
              { icon: <FaInstagram size={24} />, href: "#" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ✅ Right Section - Image (Hidden on Small Screens) */}
        <div className="hidden lg:flex justify-center">
          <div className="relative">
            {/* ✅ Main Image */}
            <img
              src={hereImage}
              alt={t("hero.imageAlt")}
              className="rounded-xl shadow-2xl w-full max-w-md lg:max-w-lg"
            />
            {/* ✅ Decorative Overlay */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-indigo-400 rounded-full opacity-50"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

// Translation files:
// en.json
// {
//   "hero": {
//     "title": "Built to Scale",
//     "subtitle": "All Private Funds",
//     "description": "We provide an integrated environment for exchanging ideas and investing in promising projects. Join us today and shape the future of innovation and business.",
//     "joinButton": "Join Now",
//     "learnMoreButton": "Learn More",
//     "imageAlt": "Innovation"
//   }
// }

// ar.json
// {
//   "hero": {
//     "title": "مصمم للتوسع",
//     "subtitle": "جميع الصناديق الخاصة",
//     "description": "نحن نقدم بيئة متكاملة لتبادل الأفكار والاستثمار في المشاريع الواعدة. انضم إلينا اليوم وساهم في تشكيل مستقبل الابتكار والأعمال.",
//     "joinButton": "انضم الآن",
//     "learnMoreButton": "اعرف المزيد",
//     "imageAlt": "الابتكار"
//   }
// }