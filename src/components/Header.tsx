import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={t("nav.language")}
    >
      {["pt", "en"].map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={i18n.language === l}
          lang={l}
          onClick={() => void i18n.changeLanguage(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Felipe Vergara — Home">
        fv<span>.</span>
      </a>
      <nav
        className={open ? "main-nav is-open" : "main-nav"}
        id="main-navigation"
        aria-label={t("nav.menu")}
      >
        {[
          ["projetos", "projects"],
          ["sobre", "about"],
          ["trajetoria", "experience"],
        ].map(([id, key]) => (
          <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
            {t("nav." + key)}
          </a>
        ))}
        <a
          className="nav-contact"
          href="#contato"
          onClick={() => setOpen(false)}
        >
          {t("nav.contact")}
          <ArrowUpRight size={17} />
        </a>
      </nav>
      <LanguageSwitch />
      <button
        className="menu-toggle"
        aria-label={t("nav.menu")}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
