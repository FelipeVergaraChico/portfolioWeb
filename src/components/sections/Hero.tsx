import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children ?? [],
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.14 }
      );

      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, scale: 0.94, y: 22 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.18 }
      );

      gsap.to(imageRef.current, {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    (e.currentTarget as HTMLElement).style.setProperty("--mx", `${x}%`);
    (e.currentTarget as HTMLElement).style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      onMouseMove={onMouseMove}
      className="section-shell grain-overlay relative overflow-hidden pt-12 md:pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(620px at var(--mx,50%) var(--my,50%), hsl(var(--accent)/0.18), transparent 72%)",
        }}
      />
      <div className="container">
        <div className="premium-panel relative overflow-hidden px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div aria-hidden className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div ref={contentRef} className="text-left">
              <span className="eyebrow">
                <MapPin className="h-3.5 w-3.5" />
                {t("hero.eyebrow")}
              </span>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] text-foreground md:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                {t("hero.description")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projetos">
                  <Button variant="hero" size="lg">
                    {t("hero.projects")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#contato">
                  <Button variant="soft" size="lg">
                    {t("hero.contact")}
                  </Button>
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/80 bg-background/70 px-4 py-4 shadow-[var(--shadow-soft)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {t(`hero.highlights.${item}.label`)}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                      {t(`hero.highlights.${item}.value`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div ref={imageRef} className="relative mx-auto w-full max-w-2xl will-change-transform">
              <div className="premium-panel-dark overflow-hidden p-4 md:p-5">
                <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-end">
                  <img
                    src={heroImage}
                    alt={t("hero.imageAlt")}
                    loading="lazy"
                    className="h-full w-full rounded-[calc(var(--radius)-0.15rem)] border border-white/10 bg-white/5 object-cover"
                  />
                  <div className="space-y-4 rounded-[calc(var(--radius)-0.15rem)] border border-white/10 bg-black/10 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                      {t("hero.asideLabel")}
                    </p>
                    <p className="text-2xl font-semibold leading-tight text-white">
                      {t("hero.asideTitle")}
                    </p>
                    <p className="text-sm leading-7 text-white/88">
                      {t("hero.asideDescription")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
