import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCommon from "./locales/en/common.json";
import trCommon from "./locales/tr/common.json";
import enErrors from "./locales/en/errors.json";
import trErrors from "./locales/tr/errors.json";
import enProducts from "./locales/en/products.json";
import trProducts from "./locales/tr/products.json";

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { 
    en: { 
      common: enCommon,
      errors: enErrors,
      products: enProducts
    }, 
    tr: { 
      common: trCommon,
      errors: trErrors,
      products: trProducts
    } 
  },
  fallbackLng: "en",
  supportedLngs: ["en", "tr"],
  ns: ["common", "errors", "products"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;

