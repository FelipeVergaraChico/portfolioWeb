import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectCover from "@/assets/project-cover.png";
import facilitaServico from "@/assets/facilitaServico.png";
import medicalService from "@/assets/medicalService.png";
import pessegosEmSetembro from "@/assets/pessegosEmSetembro.jpeg";
import gastrogourmet from "@/assets/gastrogourmet.png";
import maxCatalog from "@/assets/maxCatalog.png";
import { useTranslation } from "react-i18next";
import { Download, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
  title: string;
  techs: string[];
  description: string;
  image: string;
  repoUrl?: string;
  siteUrl?: string;
  appUrl?: string;
  tone?: "violet" | "amber" | "teal";
  imageFit?: "cover" | "contain";
};

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const projects: Project[] = [
    {
      title: "GastroGourmet",
      techs: ["React", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "WhatsApp"],
      description: t("projects.gastrogourmet.description"),
      image: gastrogourmet,
      siteUrl: "https://gastrogourmet.com.br/",
      tone: "teal",
      imageFit: "contain",
    },
    {
      title: "Max Catálogos",
      techs: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "SQLite", "Docker"],
      description: t("projects.maxCatalog.description"),
      image: maxCatalog,
      siteUrl: "https://max-catalogos.com.br/",
      tone: "amber",
      imageFit: "contain",
    },
    {
      title: "Pessegos em Setembro",
      techs: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Sanity", "Vercel"],
      description: t("projects.blogPessegos.description"),
      image: pessegosEmSetembro,
      repoUrl: "https://github.com/FelipeVergaraChico/blog-pessegos-em-setembro",
      siteUrl: "https://pessegos-em-setembro.vercel.app/",
      tone: "amber",
    },
    {
      title: "Gestão Financeira App",
      techs: ["Flutter", "Dart", "Material Design 3", "Keycloak", "Charts"],
      description: t("projects.gestaoFront.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/gestao-front",
      appUrl: "https://gestaodev.online/updates/app-latest.apk",
      tone: "violet",
    },
    {
      title: "Gestão Financeira Backend",
      techs: ["Node.js", "MongoDB", "Keycloak", "JWT", "DeepSeek", "REST API"],
      description: t("projects.gestaoBackend.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/gestao-backend",
      tone: "violet",
    },
    {
      title: "Ping Presença",
      techs: ["React 19", "TypeScript", "Keycloak", "Ant Design", "CoreUI", "Vite"],
      description: t("projects.pingPresenca.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/ping-presenca",
      tone: "teal",
    },
    {
      title: "RegistraEmpregadoAPI",
      techs: ["React", "TypeScript"],
      description: t("projects.RegistraEmpregadoAPI.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/RegistraEmpregado",
      tone: "amber",
    },
    {
      title: "FacilitaServico",
      techs: ["Vue.js", "Tailwind", "Quasar", "JWT", "Node.js", "TypeScript", "MongoDB"],
      description: t("projects.FacilitaServico.description"),
      image: facilitaServico,
      repoUrl: "https://github.com/FelipeVergaraChico/FacilitaServico",
      siteUrl: "https://facilita-servico.vercel.app/",
      tone: "teal",
    },
    {
      title: "medical-service",
      techs: ["Node.js", "Express", "MongoDB", "React", "JWT"],
      description: t("projects.medicalService.description"),
      image: medicalService,
      repoUrl: "https://github.com/FelipeVergaraChico/medical-service",
      siteUrl: "https://medical-service-red.vercel.app/",
      tone: "teal",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-project-heading]") ?? [],
        { y: 24 },
        {
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        cardRefs.current,
        { y: 36, scale: 0.98 },
        {
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderActions = (project: Project, primarySite = false) => (
    <>
      {project.appUrl && (
        <a href={project.appUrl} target="_blank" rel="noreferrer" className="max-sm:flex-1">
          <Button variant="soft" size="sm" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            {t("projects.downloadText")}
          </Button>
        </a>
      )}
      {project.siteUrl && (
        <a href={project.siteUrl} target="_blank" rel="noreferrer" className="max-sm:flex-1">
          <Button variant={primarySite ? "hero" : "soft"} size="sm" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            {t("projects.siteText")}
          </Button>
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="max-sm:flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            {t("projects.buttonText")}
          </Button>
        </a>
      )}
    </>
  );

  const toneClassMap: Record<NonNullable<Project["tone"]>, string> = {
    amber:
      "bg-[radial-gradient(circle_at_top,_hsl(29_73%_55%/.2),_transparent_65%),_linear-gradient(135deg,_hsl(var(--secondary)),_hsl(var(--background)))]",
    violet:
      "bg-[radial-gradient(circle_at_top,_hsl(270_90%_64%/.18),_transparent_65%),_linear-gradient(135deg,_hsl(var(--secondary)),_hsl(var(--background)))]",
    teal:
      "bg-[radial-gradient(circle_at_top,_hsl(188_70%_56%/.18),_transparent_65%),_linear-gradient(135deg,_hsl(var(--secondary)),_hsl(var(--background)))]",
  };

  const renderProjectCard = (project: Project, index: number, options?: { featured?: boolean; primarySite?: boolean; span?: boolean }) => (
    <Card
      key={project.title}
      ref={(el) => {
        if (el) cardRefs.current[index] = el;
      }}
      className={`group premium-panel flex h-full flex-col overflow-hidden border-border/70 bg-card/82 transition-all duration-300 hover:-translate-y-1 ${
        options?.featured ? "hover:shadow-[var(--shadow-elegant)]" : "hover:shadow-[var(--shadow-soft)]"
      } ${options?.span ? "lg:col-span-2" : ""}`}
    >
      <CardHeader className={`grid flex-1 gap-5 p-4 md:items-start ${options?.span ? "md:grid-cols-[1.02fr_0.98fr] md:p-5" : "md:grid-cols-[0.82fr_1.18fr]"}`}>
        <div
          className={`${options?.span ? "aspect-video" : "aspect-[16/10]"} overflow-hidden rounded-[calc(var(--radius)-0.25rem)] border p-3 md:p-4 ${toneClassMap[project.tone ?? "violet"]}`}
        >
          <img
            src={project.image}
            alt={`Capa do projeto ${project.title}`}
            loading="lazy"
            className={`h-full w-full rounded-[calc(var(--radius)-0.45rem)] object-top transition-transform duration-500 group-hover:scale-[1.03] ${
              project.imageFit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
        </div>
        <div className="flex h-full flex-col gap-4">
          <div className="space-y-3">
            <div className="mb-3 flex items-start justify-between gap-3">
              <CardTitle className={`${options?.span ? "text-2xl md:text-3xl" : "text-xl"} max-w-[18ch] leading-[1.05]`}>{project.title}</CardTitle>
              {options?.featured && (
                <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {t("projects.featured")}
                </span>
              )}
            </div>
            <CardDescription className={`${options?.span ? "text-sm md:text-[0.96rem] leading-7" : "text-sm leading-6"} max-w-[60ch] text-muted-foreground`}>
              {project.description}
            </CardDescription>
          </div>
          <div className="mt-auto flex min-h-[4.75rem] flex-wrap content-start gap-2 pt-1">
            {project.techs.map((tech) => (
              <span key={tech} className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto flex flex-wrap justify-end gap-2 border-t border-border/60 px-4 pb-4 pt-4 md:px-5 md:pb-5">
        {renderActions(project, options?.primarySite)}
      </CardFooter>
    </Card>
  );

  return (
    <section ref={sectionRef} id="projetos" className="section-shell relative">
      <div className="section-divider" />
      <div className="container">
        <header className="section-heading mb-12">
          <span data-project-heading className="eyebrow">{t("projects.eyebrow")}</span>
          <h2 data-project-heading className="text-3xl font-semibold md:text-5xl">{t("projects.title")}</h2>
          <p data-project-heading className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            {t("projects.description")}
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {renderProjectCard(projects[0], 0, { featured: true, primarySite: true, span: true })}
          {projects.slice(1).map((project, index) => renderProjectCard(project, index + 1))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
