import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
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
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.12 }
      );

      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, y: 28, rotate: -2, scale: 0.96 },
        { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 1.05, ease: "power3.out", delay: 0.16 }
      );

      gsap.to(imageRef.current, {
        y: -12,
        rotate: -1,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.2,
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
      className="section-shell grain-overlay relative overflow-hidden pt-10 md:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px at var(--mx,50%) var(--my,50%), hsl(var(--accent)/0.18), transparent 70%)",
        }}
      />
      <div className="container">
        <div className="premium-panel relative overflow-hidden px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div aria-hidden className="absolute inset-0 opacity-95" style={{ background: "var(--gradient-hero)" }} />
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.02fr]">
            <div ref={contentRef} className="text-left">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="eyebrow">
                  <MapPin className="h-3.5 w-3.5" />
                  {t("hero.eyebrow")}
                </span>
                <span className="cyber-tag">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  experimental mode
                </span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] text-foreground md:text-6xl xl:text-7xl">
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
                  <Button variant="outline" size="lg">
                    {t("hero.contact")}
                  </Button>
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="premium-panel px-4 py-4">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-accent">
                      {t(`hero.highlights.${item}.label`)}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-foreground">
                      {t(`hero.highlights.${item}.value`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div ref={imageRef} className="relative mx-auto w-full max-w-3xl will-change-transform">
              <div className="premium-panel-dark relative overflow-hidden p-4 md:p-5">
                <div aria-hidden className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 5px)" }} />
                <div className="relative grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
                  <div className="overflow-hidden rounded-[calc(var(--radius)-0.15rem)] border border-white/10 bg-white/5 p-3">
                    <img
                      src={heroImage}
                      alt={t("hero.imageAlt")}
                      loading="lazy"
                      className="h-full w-full rounded-[calc(var(--radius)-0.45rem)] object-cover"
                    />
                  </div>
                  <div className="space-y-4 rounded-[calc(var(--radius)-0.15rem)] border border-white/10 bg-black/15 p-5">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">
                      {t("hero.asideLabel")}
                    </p>
                    <p className="text-3xl font-semibold leading-[1.04] text-white">
                      {t("hero.asideTitle")}
                    </p>
                    <p className="text-sm leading-7 text-white/82">
                      {t("hero.asideDescription")}
                    </p>
                    <div className="border-t border-white/10 pt-4">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/55">
                        interface // system // motion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cyber-tag absolute -left-3 top-6 hidden -rotate-6 shadow-[var(--shadow-glow)] lg:flex">
                neon interface layer
              </div>
              <div className="cyber-tag absolute -bottom-4 right-8 hidden rotate-3 shadow-[var(--shadow-glow)] lg:flex">
                product x frontend x backend
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
