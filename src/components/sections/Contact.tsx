import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Instagram, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || !formRef.current) {
      toast({
        title: "Erro de configuração",
        description: "O serviço de envio de e-mail não está configurado corretamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          if (formRef.current) {
            formRef.current.reset();
          }
          toast({ title: t("contact.form.success"), description: t("contact.form.successDescription") });
        },
        (error) => {
          console.error("FAILED...", error);
          toast({
            title: t("contact.form.error"),
            description: t("contact.form.errorDescription"),
            variant: "destructive",
          });
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contato" className="section-shell relative">
      <div className="section-divider" />
      <div className="container">
        <header className="section-heading mb-12">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2 className="mx-auto w-fit text-3xl font-semibold text-balance md:text-5xl">{t("contact.title")}</h2>
          <p className="mx-auto mt-4 max-w-[38rem] text-base leading-7 text-balance text-muted-foreground md:text-lg">
            {t("contact.description")}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="premium-panel-dark p-6 md:p-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-accent">
              {t("contact.cardLabel")}
            </p>
            <p className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white">
              {t("contact.pitchTitle")}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/84">
              {t("contact.pitchDescription")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://github.com/FelipeVergaraChico" target="_blank" rel="noreferrer">
                <Button variant="soft"><Github /> GitHub</Button>
              </a>
              <a href="https://www.linkedin.com/in/felipe-vergara-chico/" target="_blank" rel="noreferrer">
                <Button variant="soft"><Linkedin /> LinkedIn</Button>
              </a>
              <a href="mailto:felipe.vergara.chico@gmail.com">
                <Button variant="soft"><Mail /> E-mail</Button>
              </a>
              <a href="https://www.instagram.com/felipevergara_c/" target="_blank" rel="noreferrer">
                <Button variant="soft"><Instagram /> Instagram</Button>
              </a>
            </div>
            <div className="mt-8 rounded-[calc(var(--radius)-0.15rem)] border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">{t("contact.directLabel")}</p>
              <a className="story-link mt-3 inline-flex items-center gap-2 text-sm text-white/78" href="mailto:felipe.vergara.chico@gmail.com">
                felipe.vergara.chico@gmail.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="premium-panel space-y-5 p-6 md:p-8">
            <div>
              <label className="mb-1 block text-sm" htmlFor="name">{t("contact.form.name")}</label>
              <Input id="name" name="name" required placeholder={t("contact.form.namePlaceholder")} />
            </div>
            <div>
              <label className="mb-1 block text-sm" htmlFor="email">{t("contact.form.email")}</label>
              <Input id="email" type="email" name="email" required placeholder={t("contact.form.emailPlaceholder")} />
            </div>
            <div>
              <label className="mb-1 block text-sm" htmlFor="message">{t("contact.form.message")}</label>
              <Textarea id="message" name="message" required placeholder={t("contact.form.messagePlaceholder")} rows={6} />
            </div>
            <Button variant="hero" size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
