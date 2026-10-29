export type Category = "web" | "mobile" | "tools" | "games";
export interface Project {
  id: string;
  title: string;
  category: Category;
  tech: string[];
  repositories: { label: string; url: string }[];
  site?: string;
  internalPath?: string;
  package?: string;
  image?: string;
  status: "production" | "open" | "development" | "public" | "academic";
  art: string;
}
const github = "https://github.com/FelipeVergaraChico/";
const repo = (name: string, label = "common.repo") => ({
  label,
  url: github + name,
});
export const projects: Project[] = [
  {
    id: "jsondiff",
    title: "JSON Diff",
    category: "tools",
    tech: ["React", "TypeScript", "JSON", "Vitest"],
    repositories: [repo("portfolioWeb")],
    internalPath: "/json-diff",
    status: "public",
    art: "jsondiff",
  },
  {
    id: "livronovel",
    title: "LivroNovel",
    category: "web",
    tech: ["Vue 3", "TypeScript", "Node.js", "PostgreSQL"],
    repositories: [repo("livro-novel")],
    site: "https://livro-novel.vercel.app/",
    status: "public",
    art: "livronovel",
  },
  {
    id: "gastro",
    title: "GastroGourmet",
    category: "web",
    tech: ["React", "NestJS", "PostgreSQL", "Docker"],
    repositories: [],
    site: "https://gastrogourmet.com.br/",
    image: "/images/gastrogourmet.png",
    status: "production",
    art: "gastro",
  },
  {
    id: "gov",
    title: "GovBR DS MCP",
    category: "tools",
    tech: ["TypeScript", "MCP", "npm", "Vitest"],
    repositories: [repo("gov-ds-mcp")],
    package: "https://www.npmjs.com/package/govbr-ds-mcp",
    status: "open",
    art: "gov",
  },
  {
    id: "stack",
    title: "StackScope",
    category: "tools",
    tech: ["Tauri", "Rust", "React", "TypeScript"],
    repositories: [repo("StackScope")],
    status: "development",
    art: "stack",
  },
  {
    id: "ping",
    title: "Ping Presença",
    category: "web",
    tech: ["React", "Fastify", "PostgreSQL", "Docker"],
    repositories: [repo("pingpresenca")],
    status: "development",
    art: "ping",
  },
  {
    id: "finance",
    title: "Gestão Financeira",
    category: "mobile",
    tech: ["Flutter", "Node.js", "MongoDB", "Keycloak"],
    repositories: [
      repo("gestao-front", "Mobile"),
      repo("gestao-backend", "API"),
    ],
    status: "open",
    art: "finance",
  },
  {
    id: "peaches",
    title: "Pêssegos em Setembro",
    category: "web",
    tech: ["Next.js", "TypeScript", "Sanity"],
    repositories: [repo("blog-pessegos-em-setembro")],
    site: "https://pessegos-em-setembro.vercel.app/",
    image: "/images/pessegos.jpeg",
    status: "open",
    art: "peaches",
  },
  {
    id: "skill",
    title: "GovBR Agent Skill",
    category: "tools",
    tech: ["Agent Skills", "GovBR-DS", "Markdown"],
    repositories: [repo("govbr-design-system")],
    status: "open",
    art: "skill",
  },
  {
    id: "facilita",
    title: "FacilitaServiço",
    category: "web",
    tech: ["Vue.js", "Quasar", "Node.js", "MongoDB"],
    repositories: [repo("FacilitaServico")],
    site: "https://facilita-servico.vercel.app/",
    status: "open",
    art: "facilita",
  },
  {
    id: "medical",
    title: "Medical Service",
    category: "web",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    repositories: [repo("medical-service")],
    site: "https://medical-service-red.vercel.app/",
    status: "open",
    art: "medical",
  },
  {
    id: "max",
    title: "Max Catálogos",
    category: "web",
    tech: ["Next.js", "TypeScript", "SQLite"],
    repositories: [],
    site: "https://max-catalogos.com.br/",
    status: "production",
    art: "max",
  },
  {
    id: "iniciapp",
    title: "IniciApp",
    category: "mobile",
    tech: ["Flutter", "Dart", "Provider", "SQLite"],
    repositories: [repo("iniciapp")],
    status: "public",
    art: "iniciapp",
  },
  {
    id: "dots",
    title: "Dots and Boxes",
    category: "games",
    tech: ["Python", "Tkinter", "Sockets", "Threading"],
    repositories: [repo("dotsV2")],
    status: "academic",
    art: "dots",
  },
];
