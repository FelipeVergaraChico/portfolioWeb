import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    (e.currentTarget as HTMLElement).style.setProperty("--mx", `${x}%`);
    (e.currentTarget as HTMLElement).style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      id="inicio"
      onMouseMove={onMouseMove}
      className="relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px at var(--mx,50%) var(--my,50%), hsl(var(--accent)/0.18), transparent 70%)",
        }}
      />
      <div className="container py-20 md:py-28 grid md:grid-cols-2 items-center gap-12">
        <div className="text-left animate-enter">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projetos"><Button variant="hero" size="lg">{t("hero.projects")}</Button></a>
            <a href="#contato"><Button variant="secondary" size="lg">{t("hero.contact")}</Button></a>
          </div>
        </div>
        <div className="relative w-full max-w-xl mx-auto md:mx-0 animate-scale-in">
          <img
            src={heroImage}
            alt="Ilustração de desenvolvedor em estilo tech roxo e azul"
            loading="lazy"
            className="rounded-xl border shadow-[var(--shadow-elegant)] hover-scale"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
