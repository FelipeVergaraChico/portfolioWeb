import { useTranslation } from "react-i18next";
const skills = [
  "Node.js",
  "React",
  "TypeScript",
  "JavaScript",
  "SQL",
  "MongoDB",
  "Docker",
  "Linux",
  "C#",
  "ASP.NET",
  "MySQL",
  "Git",
  "Vue.js",
  "Solidity",
  "Java",
];

const Skills = () => {
  const { t } = useTranslation();
  return (
    <section id="skills" className="container py-20">
      <header className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("skills.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("skills.description")}
        </p>
      </header>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((s) => (
          <span key={s} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm border">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
