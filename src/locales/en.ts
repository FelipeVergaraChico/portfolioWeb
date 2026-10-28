import { en as jsonDiff } from "../projects/json-diff/copy";
import type pt from "./pt";
type TranslationShape<T> = {
  [K in keyof T]: T[K] extends string ? string : TranslationShape<T[K]>;
};
const en: TranslationShape<typeof pt> = {
  jsonDiff,
  nav: {
    projects: "Projects",
    about: "About",
    experience: "Experience",
    contact: "Let’s talk",
    home: "Back to portfolio",
    language: "Language",
    menu: "Open navigation",
  },
  common: {
    repo: "Repository",
    visit: "Visit project",
    package: "View on npm",
    source: "Source code",
    all: "All",
    web: "Web",
    mobile: "Mobile",
    tools: "Dev tools",
    games: "Games",
    skip: "Skip to content",
    loading: "Loading project…",
    back: "Back to home",
  },
  hero: {
    eyebrow: "FULL STACK & MOBILE DEVELOPER",
    line1: "Ideas on paper.",
    line2: "Products",
    line3: "in the world.",
    intro: "Hi, I’m Felipe Vergara.",
    description:
      "I connect interfaces, APIs and mobile experiences to turn real problems into software that makes sense.",
    cta: "Explore my work",
    cv: "Download résumé",
    note: "CODE WITH INTENTION. FROM IDEA TO DEPLOY.",
    scroll: "Keep exploring",
    card: "Between idea and delivery.",
    cardSub: "That’s where I like to be.",
    location: "Porto Alegre, Brazil",
  },
  projects: {
    label: "01 / SELECTED WORK",
    title: "Built to come",
    emphasis: "to life.",
    intro:
      "Collaborative products, open source tools and a few good ideas put into practice.",
    count: "{{count}} projects",
    more: "Show more projects",
    less: "Show fewer projects",
    private: "Private source",
    production: "Live product",
    open: "Open source",
    development: "In development",
    public: "Public source",
    academic: "Academic project",
    iniciapp:
      "A gamified educational Flutter app focused on preparing young people for the job market, with learning paths, challenges and progress tracking.",
    dots: "A university project: a Dots and Boxes game in Python with player matchmaking, a Tkinter interface and socket-based client-server communication.",
    preview: "Project image",
    github: "More code on GitHub",
    empty: "No projects in this category.",
    jsondiff:
      "A JSON comparator highlighting additions, removals and changes, with file import and report export. All processing happens locally in your browser.",
    gastro:
      "A collaborative SaaS platform for restaurants operating through WhatsApp. Multi-company and multi-store management, from orders to operations.",
    gov: "GovBR Design System documentation for AI agents. An MCP server with local search, Tools, Resources and Prompts. An independent community project.",
    stack:
      "A view of everything running on localhost. A desktop app to discover ports, identify technologies and manage local services. Early-stage development.",
    ping: "Free software for academic attendance. Attendance workflows, role-based authorization and auditing in a full stack application under development.",
    finance:
      "A mobile app for expenses, income and recurring transactions. Flutter connected to a Node.js API, MongoDB and Keycloak authentication.",
    peaches:
      "A digital home for stories and reading. An editorial blog with Next.js, Sanity-managed content and a focus on the reading experience.",
    skill:
      "An Agent Skill with guidance on GovBR Design System components, forms and accessibility. A community tool for AI-assisted development.",
    facilita:
      "A platform connecting clients and service providers, with a Vue.js interface and an integrated API to manage the experience.",
    medical:
      "A web application for medical services, built with React and connected to a Node.js API with authentication.",
    max: "A digital catalog with a management dashboard, built with Next.js and TypeScript to organize and showcase products.",
  },
  lab: {
    label: "02 / TRY IT RIGHT HERE",
    title: "Projects to",
    emphasis: "explore.",
    description: "Tools you can use right now, without leaving the portfolio.",
    tag: "INTERACTIVE · IN YOUR BROWSER",
    detail:
      "Compare two JSON documents and find added, removed or changed fields. Your data stays in your browser.",
    open: "Open JSON Diff",
  },
  about: {
    label: "03 / ABOUT ME",
    title: "Curiosity to understand.",
    emphasis: "Code to solve.",
    p1: "I’m Felipe Vergara Chico, a full stack and mobile developer studying Computer Science at UniRitter in Porto Alegre, Brazil.",
    p2: "My experience spans government systems at SERPRO, education at Ânima and collaborative products. I like understanding the whole problem: from the user experience to the API and infrastructure behind it.",
    p3: "Along the way, I also create open source tools and explore new ways of building software.",
    education: "Computer Science",
    institution: "UniRitter · In progress",
    languages: "Native Portuguese · Good English proficiency",
    stackTitle: "My toolbox",
    frontend: "Interfaces",
    backend: "APIs & data",
    mobile: "Mobile",
    infra: "Infra & quality",
  },
  experience: {
    label: "04 / EXPERIENCE",
    title: "Building experience.",
    present: "Present",
    serproRole: "Software Development Intern",
    serproDate: "May 2025 — Present",
    serpro:
      "REST APIs, microservices, blockchain and decentralized identity solutions. Integration with Keycloak, OAuth 2.0 and OpenID Connect.",
    animaRole: "Front-end Development Scholar",
    animaDate: "Sep 2026 — Present",
    anima:
      "Building interfaces and features in Vue.js and TypeScript for a university student résumé platform.",
    aikiRole: "Full Stack & Mobile Development Scholar",
    aikiDate: "Sep 2025 — Jun 2026",
    aiki: "Flutter application and Node.js API with PostgreSQL. Authentication, profiles, videos, tests and dojo location.",
    wayRole: "Development Scholar",
    wayDate: "Jul 2025 — Dec 2025",
    way: "Features and improvements in Vue.js for an academic project creation platform.",
  },
  contact: {
    label: "05 / THE NEXT CONVERSATION",
    title: "Let’s bring an idea",
    emphasis: "to life.",
    intro:
      "Have a project, an opportunity, or just want to exchange ideas? Tell me about it.",
    name: "Your name",
    email: "Your email",
    message: "What do you have in mind?",
    namePlaceholder: "What should I call you?",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "A little about your idea, project or opportunity…",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent! Thanks for reaching out.",
    error:
      "Could not send your message. Please try again or use the email address alongside.",
    unavailable:
      "The form is currently unavailable. Please use the email address alongside.",
    privacy: "Your information will only be used to reply to your message.",
    direct: "Or get in touch directly:",
    bot: "Leave this field empty",
  },
  footer: { text: "Made with intention, end to end.", top: "Back to top" },
  notFound: {
    title: "This path doesn’t exist yet.",
    text: "The address may have changed. The projects and ideas are still here.",
  },
};
export default en;
