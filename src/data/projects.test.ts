import { expect, it } from "vitest";
import { projects } from "./projects";
import pt from "../locales/pt";
import en from "../locales/en";
it("keeps unique projects, descriptions in both languages and usable destinations", () => {
  expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
  for (const project of projects) {
    expect(pt.projects).toHaveProperty(project.id);
    expect(en.projects).toHaveProperty(project.id);
    expect(Boolean(project.site || project.repositories.length)).toBe(true);
    for (const url of [
      project.site,
      project.package,
      ...project.repositories.map((r) => r.url),
    ].filter(Boolean)) {
      expect(new URL(url!).protocol).toBe("https:");
    }
  }
});
