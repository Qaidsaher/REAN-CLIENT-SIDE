import React from "react";
import { FaLaptopCode, FaBriefcase, FaSeedling, FaUserMd } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const areas = [
  {
    titleKey: "areas.technology.title",
    icon: <FaLaptopCode />,
    color: "bg-blue-100",
    borderColor: "border-blue-500",
    textColor: "text-blue-600",
    descriptionKey: "areas.technology.description"
  },
  {
    titleKey: "areas.medicine.title",
    icon: <FaUserMd />,
    color: "bg-green-100",
    borderColor: "border-green-500",
    textColor: "text-green-600",
    descriptionKey: "areas.medicine.description"
  },
  {
    titleKey: "areas.agriculture.title",
    icon: <FaSeedling />,
    color: "bg-yellow-100",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-600",
    descriptionKey: "areas.agriculture.description"
  },
  {
    titleKey: "areas.business.title",
    icon: <FaBriefcase />,
    color: "bg-red-100",
    borderColor: "border-red-500",
    textColor: "text-red-600",
    descriptionKey: "areas.business.description"
  }
];

const Areas = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <section className="py-16 bg-gray-50" dir="auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          {t("areas.sectionTitle")}
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
              <div className={`mt-4 md:mt-0 ${isRtl ? "md:mr-6 text-right" : "md:ml-6 text-left"} text-center md:text-${isRtl ? "right" : "left"}`}>
                <h3 className={`text-2xl font-semibold ${area.textColor}`}>
                  {t(area.titleKey)}
                </h3>
                <p className="mt-2 text-gray-700">{t(area.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Areas;


