import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Download,
  MapPin,
  Plus,
  Code2,
  Cpu,
  Globe,
  Smartphone,
} from "lucide-react";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
export default function Portfolio() {
  const { t, i18n } = useTranslation();
  return (
    <div className="portfolio" id="inicio">
      <a className="skip-link" href="#conteudo">
        {t("common.skip")}
      </a>
      <Header />
      <main id="conteudo">
        <section className="hero section">
          <div className="hero-topline">
            <p className="eyebrow">
              <span className="small-cross">✳</span>
              {t("hero.eyebrow")}
            </p>
            <span className="mono hero-location">
              <MapPin size={13} />
              {t("hero.location")}
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <h1>
                {t("hero.line1")}
                <br />
                {t("hero.line2")}
                <br />
                <span className="serif hero-emphasis">{t("hero.line3")}</span>
                <span className="hero-period">*</span>
              </h1>
              <div className="hero-description">
                <span className="hero-line" />
                <div>
                  <strong>{t("hero.intro")}</strong>
                  <p>{t("hero.description")}</p>
                </div>
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#projetos">
                  {t("hero.cta")}
                  <ArrowDownRight size={20} />
                </a>
                <a
                  className="download-link"
                  href={
                    i18n.resolvedLanguage === "en"
                      ? "/felipe-vergara-chico-en.pdf"
                      : "/felipe-vergara-chico.pdf"
                  }
                  download
                >
                  {t("hero.cv")}
                  <Download size={16} />
                </a>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-top">
                <span>FV / DEV</span>
                <span>01 — ∞</span>
              </div>
              <div className="orbital">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="orbit orbit-three" />
                <div className="orbit-center">
                  fv<span>.</span>
                </div>
                <span className="orbit-dot" />
                <span className="orbit-label label-web">&lt;web /&gt;</span>
                <span className="orbit-label label-mobile">mobile</span>
                <span className="orbit-label label-api">API</span>
              </div>
              <div className="art-bottom">
                <p>
                  {t("hero.card")}
                  <br />
                  <span>{t("hero.cardSub")}</span>
                </p>
                <ArrowUpRight size={38} strokeWidth={1} />
              </div>
              <div className="orange-stamp">
                <Code2 size={26} />
                <span>
                  BUILD.
                  <br />
                  LEARN.
                  <br />
                  REPEAT.
                </span>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <p className="mono">{t("hero.note")}</p>
            <a href="#projetos">
              {t("hero.scroll")}
              <ArrowDown size={16} />
            </a>
          </div>
        </section>
        <div
          className="stack-ribbon"
          aria-label="React, TypeScript, Node.js, Vue.js, Flutter, PostgreSQL"
        >
          {[
            "React",
            "TypeScript",
            "Node.js",
            "Vue.js",
            "Flutter",
            "PostgreSQL",
          ].map((x) => (
            <span key={x}>
              {x}
              <Plus size={17} />
            </span>
          ))}
        </div>
        <Projects />
        <section
          className="live-projects section"
          id="laboratorio"
          aria-labelledby="live-projects-title"
        >
          <div className="live-projects-copy">
            <p className="eyebrow">{t("lab.label")}</p>
            <h2 id="live-projects-title">
              {t("lab.title")}
              <br />
              <span className="serif">{t("lab.emphasis")}</span>
            </h2>
            <p>{t("lab.description")}</p>
          </div>
          <Link
            to="/json-diff"
            className="live-project-card"
            aria-label={t("lab.open")}
          >
            <div className="live-project-preview" aria-hidden="true">
              <span>JSON DIFF</span>
              <code>
                <span>− "version": 1</span>
                <span>+ "version": 2</span>
              </code>
              <span>{"{ before → after }"}</span>
            </div>
            <div className="live-project-details">
              <span className="mono">{t("lab.tag")}</span>
              <h3>JSON Diff</h3>
              <p>{t("lab.detail")}</p>
              <span className="text-link">
                {t("lab.open")}
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        </section>
        <section className="about-section section" id="sobre">
          <div>
            <p className="eyebrow">{t("about.label")}</p>
            <h2>
              {t("about.title")}
              <br />
              <span className="serif">{t("about.emphasis")}</span>
            </h2>
            <div className="about-note">
              <span className="big-asterisk" aria-hidden="true">
                ✳
              </span>
              <div>
                <strong>{t("about.education")}</strong>
                <p>{t("about.institution")}</p>
                <span>{t("about.languages")}</span>
              </div>
            </div>
          </div>
          <div className="about-copy">
            <p className="lead">{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
          <div className="toolbox">
            <h3 className="mono">{t("about.stackTitle")}</h3>
            <div className="toolbox-grid">
              {[
                {
                  key: "frontend",
                  icon: Globe,
                  tech: "React · Vue.js · TypeScript · HTML · CSS",
                },
                {
                  key: "backend",
                  icon: Code2,
                  tech: "Node.js · NestJS · Express · PostgreSQL · MongoDB · Prisma",
                },
                {
                  key: "mobile",
                  icon: Smartphone,
                  tech: "Flutter · Dart · Kotlin",
                },
                {
                  key: "infra",
                  icon: Cpu,
                  tech: "Docker · Git · Linux · Keycloak · Vitest · Jest · Playwright",
                },
              ].map(({ key, icon: Icon, tech }) => (
                <div className="tool-group" key={key}>
                  <Icon size={23} strokeWidth={1.5} />
                  <h4>{t("about." + key)}</h4>
                  <p>{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="experience-section section" id="trajetoria">
          <p className="eyebrow">{t("experience.label")}</p>
          <h2>{t("experience.title")}</h2>
          <div className="timeline">
            {[
              {
                id: "serpro",
                name: "SERPRO",
                tech: "Kotlin / Node.js / React / Keycloak",
              },
              {
                id: "anima",
                name: "Ânima Educação · Vortex",
                tech: "Vue.js / TypeScript",
              },
              {
                id: "aiki",
                name: "AikiFlow",
                tech: "Flutter / Node.js / PostgreSQL",
              },
              { id: "way", name: "WayHub", tech: "Vue.js" },
            ].map((e, i) => (
              <article key={e.id} className="experience-row">
                <span className="experience-number mono">0{i + 1}</span>
                <div className="experience-company">
                  <h3>{e.name}</h3>
                  <p>{t("experience." + e.id + "Role")}</p>
                  <span className="mono">
                    {t("experience." + e.id + "Date")}
                  </span>
                </div>
                <div className="experience-description">
                  <p>{t("experience." + e.id)}</p>
                  <span className="mono">{e.tech}</span>
                </div>
                <ArrowUpRight className="experience-arrow" size={22} />
              </article>
            ))}
          </div>
        </section>
        <Contact />
      </main>
      <footer className="site-footer">
        <a className="wordmark" href="#inicio">
          fv<span>.</span>
        </a>
        <p>
          © {new Date().getFullYear()} Felipe Vergara Chico
          <br />
          <span>{t("footer.text")}</span>
        </p>
        <a className="text-link" href="#inicio">
          {t("footer.top")}
          <ArrowRight className="rotate-up" size={18} />
        </a>
      </footer>
    </div>
  );
}
