import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

interface IndependentProject {
  path: string;
  titleKey: string;
  Component: LazyExoticComponent<ComponentType>;
}

// Register real projects here with lazy(() => import("./project/Project")).
// Paths are relative to the domain root.
export const independentProjects: IndependentProject[] = [
  {
    path: "/json-diff",
    titleKey: "jsonDiff.title",
    Component: lazy(() => import("./json-diff/JsonDiff")),
  },
];
