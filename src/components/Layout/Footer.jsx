import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white shadow-lg py-10" dir="auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* ✅ Terms & Policies */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">{t("footer.legalTitle")}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                  {t("footer.conflictPolicy")}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
                  {t("footer.defaultRates")}
                </a>
              </li>
            </ul>
          </div>

          {/* ✅ Social Media Icons */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">{t("footer.followUs")}</h3>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* ✅ Company Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">{t("footer.companyTitle")}</h3>
            <p className="mt-4 text-gray-700">
              {t("footer.rights", { year: new Date().getFullYear() })}
              <span className="text-indigo-600 font-bold"> REAN</span>
            </p>
          </div>
        </div>

        {/* ✅ Bottom Divider */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
          {t("footer.bottomText", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
