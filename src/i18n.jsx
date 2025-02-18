// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
// Translation resources for English and Arabic
const resources = {
  en: { translation: en },
  ar: { translation: ar }
};

i18n
  .use(initReactI18next) // Connects i18next with React
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });

// When language changes, update document direction
i18n.on('languageChanged', (lng) => {
  if (lng === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
});

export default i18n;
