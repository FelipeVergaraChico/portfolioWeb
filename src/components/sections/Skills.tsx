import { useTranslation } from "react-i18next";

const skillGroups = [
  {
    key: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Quasar", "Vite"],
  },
  {
    key: "backend",
    skills: ["Node.js", "Express", "C#", "ASP.NET", "MongoDB", "MySQL", "SQL"],
  },
  {
    key: "mobile",
    skills: ["Flutter", "Dart", "Material Design 3", "Android APK"],
  },
  {
    key: "platform",
    skills: ["Docker", "Linux", "Keycloak", "Sanity", "Git", "Java", "Solidity"],
  },
];

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section-shell relative">
      <div className="section-divider" />
      <div className="container">
        <header className="section-heading mb-12">
          <span className="eyebrow">{t("skills.eyebrow")}</span>
          <h2 className="text-3xl font-semibold md:text-5xl">{t("skills.title")}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {t("skills.description")}
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.key} className="premium-panel p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {t(`skills.groups.${group.key}.label`)}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {t(`skills.groups.${group.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {t(`skills.groups.${group.key}.description`)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/70 bg-background/72 px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
