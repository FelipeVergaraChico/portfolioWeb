import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
      <Button
        variant="soft"
        size="icon"
        aria-label={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
        title={isDark ? "Tema: Escuro (clique para Claro)" : "Tema: Claro (clique para Escuro)"}
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        className="border border-border/70 bg-background/85 shadow-[var(--shadow-soft)] backdrop-blur"
      >
        {isDark ? <Sun className="transition-transform" /> : <Moon className="transition-transform" />}
      </Button>
    </div>
  );
};

export default ThemeToggle;
