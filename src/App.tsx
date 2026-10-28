import { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Portfolio from "./Portfolio";
import { independentProjects } from "./projects/registry";
function RouteMetadata() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const project = independentProjects.find(
      (p) => p.path === pathname.replace(/\/$/, ""),
    );
    document.title = project
      ? `${t(project.titleKey)} | Felipe Vergara`
      : pathname === "/"
        ? "Felipe Vergara — Full Stack & Mobile"
        : `404 | Felipe Vergara`;
  }, [pathname, t, i18n.language]);
  return null;
}
function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="not-found">
      <span className="error-number">404</span>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.text")}</p>
      <Link className="button primary" to="/">
        {t("common.back")}
      </Link>
    </main>
  );
}
export default function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <RouteMetadata />
      <Suspense
        fallback={
          <main className="project-loading" role="status">
            {t("common.loading")}
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          {independentProjects.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
