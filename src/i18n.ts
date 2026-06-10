import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: (languages: string[], namespaces: string[]) => {
        const language = languages[0]?.split("-")[0] ?? "pt";
        const namespace = namespaces[0] ?? "translation";

        return `/locales/${language}/${namespace}.json`;
      },
    },
  });

export default i18n;
