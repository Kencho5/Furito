import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import ge from "./translations/ge.json";

const savedLanguage = localStorage.getItem("language") || "ge";

i18n.use(initReactI18next).init({
  resources: {
    ge: { translation: ge },
    en: { translation: en },
  },
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
