import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Github,
  ArrowDown,
  Terminal,
  Layers,
  Fingerprint,
  Activity,
  Braces,
  Smartphone,
  Gamepad2,
} from "lucide-react";
import { projects, type Category, type Project } from "../data/projects";
export function ProjectArt({ project }: { project: Project }) {
  const { t } = useTranslation();
  if (project.image)
    return (
      <div className={"project-art image-art art-" + project.art}>
        <img
          src={project.image}
          alt={`${t("projects.preview")}: ${project.title}`}
          loading="lazy"
          width="800"
          height="500"
        />
      </div>
    );
  const Icon =
    project.art === "iniciapp"
      ? Smartphone
      : project.art === "dots"
        ? Gamepad2
        : project.art === "gov" || project.art === "jsondiff"
          ? Braces
          : project.art === "stack"
            ? Terminal
            : project.art === "ping"
              ? Fingerprint
              : project.art === "medical"
                ? Activity
                : Layers;
  return (
    <div className={"project-art art-" + project.art} aria-hidden="true">
      <div className="art-grid" />
      <span className="art-index">
        {project.category.toUpperCase()} / {project.tech[0]}
      </span>
      <Icon className="art-icon" strokeWidth={1} />
      <strong>{project.title}</strong>
      <span className="art-code">
        {project.art === "jsondiff"
          ? "before → after"
          : project.art === "gov"
            ? "documentation → context → code"
            : project.art === "stack"
              ? "localhost: everything"
              : project.art === "ping"
                ? "presença. registrada."
                : '{ ideas: "implemented" }'}
      </span>
      <span className="art-corner">↗</span>
    </div>
  );
}
export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const filtered = projects.filter(
    (p) => filter === "all" || p.category === filter,
  );
  const visible = expanded ? filtered : filtered.slice(0, 6);
  return (
    <section id="projetos" className="section projects-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("projects.label")}</p>
          <h2>
            {t("projects.title")}
            <br />
            <span className="serif">{t("projects.emphasis")}</span>
          </h2>
        </div>
        <p className="section-intro">{t("projects.intro")}</p>
      </div>
      <div className="filter-row">
        <div className="filters" role="group" aria-label={t("nav.projects")}>
          {(["all", "web", "mobile", "tools", "games"] as const).map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setExpanded(false);
              }}
            >
              {t("common." + f)}
            </button>
          ))}
        </div>
        <span className="mono count" aria-live="polite">
          {t("projects.count", { count: filtered.length })}
        </span>
      </div>
      <div className="project-grid">
        {visible.map((p) => (
          <article className="project-card" key={p.id}>
            <ProjectArt project={p} />
            <div className="project-meta">
              <span className="mono">
                {String(projects.indexOf(p) + 1).padStart(2, "0")} /{" "}
                {t("common." + p.category)}
              </span>
              <span className={"project-status " + p.status}>
                {t("projects." + p.status)}
              </span>
            </div>
            <h3>
              {p.title}
              <span aria-hidden="true">↗</span>
            </h3>
            <p className="project-description">{t("projects." + p.id)}</p>
            <ul className="tech-tags">
              {p.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="project-links">
              {p.internalPath && (
                <Link to={p.internalPath}>
                  {t("common.visit")}
                  <ArrowUpRight size={16} />
                  <span className="sr-only"> — {p.title}</span>
                </Link>
              )}
              {p.site && (
                <a href={p.site} target="_blank" rel="noreferrer">
                  {t("common.visit")}
                  <ArrowUpRight size={16} />
                  <span className="sr-only"> — {p.title}</span>
                </a>
              )}
              {p.package && (
                <a href={p.package} target="_blank" rel="noreferrer">
                  {t("common.package")}
                  <ArrowUpRight size={16} />
                </a>
              )}
              {p.repositories.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noreferrer">
                  <Github size={15} />
                  {t(r.label)}
                  <span className="sr-only"> — {p.title}</span>
                </a>
              ))}
              {!p.repositories.length && (
                <span className="private-code">{t("projects.private")}</span>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="projects-bottom">
        {filtered.length > 6 && (
          <button
            className="button outline"
            onClick={() => setExpanded(!expanded)}
          >
            {t(expanded ? "projects.less" : "projects.more")}
            <ArrowDown size={17} className={expanded ? "flipped" : ""} />
          </button>
        )}
        <a
          className="text-link"
          href="https://github.com/FelipeVergaraChico?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          {t("projects.github")}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
