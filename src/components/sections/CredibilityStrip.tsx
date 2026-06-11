import { useTranslation } from "react-i18next";
import { BriefcaseBusiness, ShieldCheck, Sparkles } from "lucide-react";

const icons = [BriefcaseBusiness, ShieldCheck, Sparkles] as const;

const CredibilityStrip = () => {
  const { t } = useTranslation();

  return (
    <section className="container relative z-10 -mt-8 md:-mt-12">
      <div className="premium-panel grid gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
        {[0, 1, 2].map((index) => {
          const Icon = icons[index];

          return (
            <article
              key={index}
              className="rounded-[calc(var(--radius)-0.15rem)] border border-border/70 bg-background/60 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon className="h-5 w-5 text-accent" />
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <p className="mb-2 text-sm font-semibold text-foreground">
                {t(`credibility.items.${index}.title`)}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {t(`credibility.items.${index}.description`)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CredibilityStrip;
