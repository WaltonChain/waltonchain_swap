
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import enUsTrans from "./en.json";
import zhCnTrans from "./zh-CN.json";
import { initReactI18next } from 'react-i18next';

i18n
.use(LanguageDetector)
.use(initReactI18next) 
.init({
  resources: {
    enUs: {
      translation: enUsTrans,
    },
    zhCn: {
      translation: zhCnTrans,
    },
  },
  fallbackLng: "zhCn",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
})
 
export default i18n;
