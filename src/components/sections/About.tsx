import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="sobre" className="container py-20">
      <header className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("about.title")}</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {t("about.description")}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        <article className="space-y-4">
          <h3 className="text-xl font-semibold">{t("experience.title")}</h3>
          <div className="rounded-lg border p-4">
            <p className="font-medium">{t("experience.blockchain_intern.role")}</p>
            <p className="text-sm text-muted-foreground">{t("experience.blockchain_intern.company")} — {t("experience.blockchain_intern.date")}</p>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
              <li>{t("experience.blockchain_intern.duties.0")}</li>
              <li>{t("experience.blockchain_intern.duties.1")}</li>
              <li>{t("experience.blockchain_intern.duties.2")}</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <p className="font-medium">{t("experience.frontend_intern.role")}</p>
            <p className="text-sm text-muted-foreground">{t("experience.frontend_intern.company")} — {t("experience.frontend_intern.date")}</p>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
              <li>{t("experience.frontend_intern.duties.0")}</li>
              <li>{t("experience.frontend_intern.duties.1")}</li>
            </ul>
          </div>
        </article>

        <aside className="space-y-4">
          <h3 className="text-xl font-semibold">{t("education.title")}</h3>
          <div className="rounded-lg border p-4">
            <p className="font-medium">{t("education.degree")}</p>
            <p className="text-sm text-muted-foreground">{t("education.status")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
