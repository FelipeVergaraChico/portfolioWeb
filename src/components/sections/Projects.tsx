import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectCover from "@/assets/project-cover.png";
import recipeapp from "@/assets/recipe-app.png";
import facilitaServico from "@/assets/facilitaServico.png";
import medicalService from "@/assets/medicalService.png";
import { useTranslation } from "react-i18next";

type Project = {
  title: string;
  slug: string;
  techs: string[];
  description: string;
  image: string;
};


const Projects = () => {
  const { t } = useTranslation();
  const projects: Project[] = [
    {
      title: "recipesApp",
      slug: "recipesApp",
      techs: ["React", "Context API", "bootstrap"],
      description: t("projects.recipesApp.description"),
      image: recipeapp,
    },
    {
      title: "trybeSmithAPI",
      slug: " trybeSmith",
      techs: ["TypeScript", "Node.js", "Sequelize", "MySQL", "chai", "JWT", "Express"],
      description: t("projects.trybeSmithAPI.description"),
      image: projectCover,
    },
    {
      title: "RegistraEmpregadoAPI",
      slug: "RegistraEmpregado",
      techs: ["React", "TypeScript"],
      description: t("projects.RegistraEmpregadoAPI.description"),
      image: projectCover
    },
    {
      title: "blogAPI",
      slug: "blogAPI",
      techs: ["Node.js", "Express", "JWT", "Sequelize", "MySQL", "joi"],
      description: t("projects.blogAPI.description"),
      image: projectCover,
    },
    {
      title: "FacilitaServico",
      slug: "FacilitaServico",
      techs: ["Vue.js", "Tailwind", "Quasar", "JWT", "Node.js", "TypeScript", "MongoDB"],
      description: t("projects.FacilitaServico.description"),
      image: facilitaServico,
    },
    {
      title: "medical-service",
      slug: "medical-service",
      techs: ["Node.js", "Express", "MongoDB", "React", "JWT"],
      description: t("projects.medicalService.description"),
      image: medicalService,
    
    },
  ];
  return (
    <section id="projetos" className="container py-20">
      <header className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("projects.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("projects.description")}
        </p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.title} className="group hover-scale">
            <CardHeader>
              <img
                src={p.image}
                alt={`Capa do projeto ${p.title}`}
                loading="lazy"
                className="rounded-md border"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{p.title}</CardTitle>
              <CardDescription className="mb-3">{p.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {p.techs.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <a href={`https://github.com/FelipeVergaraChico/${p.slug}`} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">{t("projects.buttonText")}</Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
