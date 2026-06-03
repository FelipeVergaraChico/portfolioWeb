import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import projectCover from "@/assets/project-cover.png";
import facilitaServico from "@/assets/facilitaServico.png";
import medicalService from "@/assets/medicalService.png";
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
  repoUrl: string;
  siteUrl?: string;
  appUrl?: string;
};

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const projects: Project[] = [
    {
      title: "Pessegos em Setembro",
      techs: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Sanity", "Vercel"],
      description: t("projects.blogPessegos.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/blog-pessegos-em-setembro",
      siteUrl: "https://pessegos-em-setembro.vercel.app/",
    },
    {
      title: "Gestão Financeira App",
      techs: ["Flutter", "Dart", "Material Design 3", "Keycloak", "Charts"],
      description: t("projects.gestaoFront.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/gestao-front",
      appUrl: "https://gestaodev.online/updates/app-latest.apk",
    },
    {
      title: "Gestão Financeira Backend",
      techs: ["Node.js", "MongoDB", "Keycloak", "JWT", "DeepSeek", "REST API"],
      description: t("projects.gestaoBackend.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/gestao-backend",
    },
    {
      title: "Ping Presença",
      techs: ["React 19", "TypeScript", "Keycloak", "Ant Design", "CoreUI", "Vite"],
      description: t("projects.pingPresenca.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/ping-presenca",
    },
    {
      title: "RegistraEmpregadoAPI",
      techs: ["React", "TypeScript"],
      description: t("projects.RegistraEmpregadoAPI.description"),
      image: projectCover,
      repoUrl: "https://github.com/FelipeVergaraChico/RegistraEmpregado",
    },
    {
      title: "FacilitaServico",
      techs: ["Vue.js", "Tailwind", "Quasar", "JWT", "Node.js", "TypeScript", "MongoDB"],
      description: t("projects.FacilitaServico.description"),
      image: facilitaServico,
      repoUrl: "https://github.com/FelipeVergaraChico/FacilitaServico",
      siteUrl: "https://facilita-servico.vercel.app/",
    },
    {
      title: "medical-service",
      techs: ["Node.js", "Express", "MongoDB", "React", "JWT"],
      description: t("projects.medicalService.description"),
      image: medicalService,
      repoUrl: "https://github.com/FelipeVergaraChico/medical-service",
      siteUrl: "https://medical-service-red.vercel.app/",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-project-heading]") ?? [],
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
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
        { autoAlpha: 0, y: 36, scale: 0.98 },
        {
          autoAlpha: 1,
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

  return (
    <section ref={sectionRef} id="projetos" className="container py-20">
      <header className="mb-10 text-center">
        <h2 data-project-heading className="text-3xl md:text-4xl font-bold mb-3">{t("projects.title")}</h2>
        <p data-project-heading className="text-muted-foreground max-w-2xl mx-auto">
          {t("projects.description")}
        </p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, index) => (
          <Card
            key={p.title}
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            className="group overflow-hidden border-border/70 bg-card/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
          >
            <CardHeader>
              <img
                src={p.image}
                alt={`Capa do projeto ${p.title}`}
                loading="lazy"
                className="aspect-video w-full rounded-md border object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-start justify-between gap-3">
                <CardTitle className="text-xl leading-tight">{p.title}</CardTitle>
                {index < 3 && (
                  <span className="shrink-0 rounded-md border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                    {t("projects.featured")}
                  </span>
                )}
              </div>
              <CardDescription className="mb-3">{p.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {p.techs.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-end gap-2">
              {p.appUrl && (
                <a href={p.appUrl} target="_blank" rel="noreferrer">
                  <Button variant="hero" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    {t("projects.downloadText")}
                  </Button>
                </a>
              )}
              {p.siteUrl && (
                <a href={p.siteUrl} target="_blank" rel="noreferrer">
                  <Button variant="soft" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("projects.siteText")}
                  </Button>
                </a>
              )}
              <a href={p.repoUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm">
                  <Github className="mr-2 h-4 w-4" />
                  {t("projects.buttonText")}
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
