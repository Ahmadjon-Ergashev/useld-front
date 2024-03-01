import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import translationRu from "./assets/locales/ru/translation.json";
import translationEn from "./assets/locales/en/translation.json";
const resources = {
  ru: {
    translation: translationRu,
  },
  en: {
    translation: translationEn,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources,
    supportedLngs: [ "en",  "uz","ru"],
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "path",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    react: { useSuspense: true }, 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
