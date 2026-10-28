import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/pt";
import en from "./locales/en";
let language = navigator.language.startsWith("pt") ? "pt" : "en";
try {
  const saved = localStorage.getItem("portfolio-language");
  if (saved === "pt" || saved === "en") language = saved;
} catch {
  /* Storage may be disabled. */
}
void i18n
  .use(initReactI18next)
  .init({
    resources: { pt: { translation: pt }, en: { translation: en } },
    lng: language,
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
  });
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng === "pt" ? "pt-BR" : "en";
  try {
    localStorage.setItem("portfolio-language", lng);
  } catch {
    /* Keep in-memory language. */
  }
});
document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
export default i18n;
