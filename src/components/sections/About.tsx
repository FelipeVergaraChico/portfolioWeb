import { useTranslation } from "react-i18next";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="sobre" className="section-shell relative">
      <div className="section-divider" />
      <div className="container">
        <header className="section-heading mb-12">
          <span className="eyebrow">{t("about.eyebrow")}</span>
          <h2 className="text-3xl font-semibold md:text-5xl">{t("about.title")}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {t("about.description")}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="premium-panel p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold md:text-2xl">{t("experience.title")}</h3>
            </div>
            <div className="space-y-5">
              {(["blockchain_intern", "frontend_intern"] as const).map((item) => (
                <div key={item} className="rounded-[calc(var(--radius)-0.3rem)] border border-border/70 bg-background/72 p-5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{t(`experience.${item}.role`)}</p>
                      <p className="text-sm text-muted-foreground">{t(`experience.${item}.company`)}</p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{t(`experience.${item}.date`)}</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                    {Array.from({ length: item === "blockchain_intern" ? 3 : 2 }).map((_, duty) => (
                      <li key={duty} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{t(`experience.${item}.duties.${duty}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <aside className="grid gap-6">
            <div className="premium-panel-dark p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-semibold text-white md:text-2xl">{t("education.title")}</h3>
              </div>
              <p className="text-lg font-semibold text-white">{t("education.degree")}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{t("education.status")}</p>
            </div>
            <div className="premium-panel p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t("about.summaryLabel")}
              </p>
              <p className="mt-4 text-xl font-semibold leading-tight text-foreground">
                {t("about.summaryTitle")}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {t("about.summaryDescription")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default About;
