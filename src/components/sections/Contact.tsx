import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
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
    <section id="contato" className="container py-20">
      <header className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("contact.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("contact.description")}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/FelipeVergaraChico" target="_blank" rel="noreferrer">
              <Button variant="outline"><Github /> GitHub</Button>
            </a>
            <a href="https://www.linkedin.com/in/felipe-vergara-chico/" target="_blank" rel="noreferrer">
              <Button variant="outline"><Linkedin /> LinkedIn</Button>
            </a>
            <a href="mailto:felipe.vergara.chico@gmail.com">
              <Button variant="outline"><Mail /> E-mail</Button>
            </a>
            <a href="https://www.instagram.com/felipevergara_c/" target="_blank" rel="noreferrer">
              <Button variant="outline"><Instagram /> Instagram</Button>
            </a>
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-semibold">{t("contact.githubStats")}</h3>
            <img
              src="https://camo.githubusercontent.com/be7821b01ee1c249be499968e12447febdfde87e77da02666c35b0b8b7920f78/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67733f757365726e616d653d46656c69706556657267617261436869636f266c6f63616c653d656e26686964655f7469746c653d66616c7365266c61796f75743d636f6d7061637426636172645f77696474683d333230266c616e67735f636f756e743d35267468656d653d746f6b796f6e6967687426686964655f626f726465723d66616c7365266f726465723d32"
              alt="Linguagens mais usadas de Felipe Vergara"
              loading="lazy"
              className="rounded-md border"
            />
            <img
              src="https://camo.githubusercontent.com/239c33e5c230dd3e9823c16f608e8fd302bc4191ca571a6bb4a729b81f70fde4/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d46656c69706556657267617261436869636f26686964655f7469746c653d66616c736526686964655f72616e6b3d66616c73652673686f775f69636f6e733d7472756526696e636c7564655f616c6c5f636f6d6d6974733d7472756526636f756e745f707269766174653d747275652664697361626c655f616e696d6174696f6e733d66616c7365267468656d653d746f6b796f6e69676874266c6f63616c653d656e26686964655f626f726465723d66616c7365266f726465723d31"
              alt="Gráfico de contribuições (streak) de Felipe Vergara"
              loading="lazy"
              className="rounded-md border"
            />
          </div>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">{t("contact.form.name")}</label>
            <Input id="name" name="name" required placeholder={t("contact.form.namePlaceholder")} />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">{t("contact.form.email")}</label>
            <Input id="email" type="email" name="email" required placeholder={t("contact.form.emailPlaceholder")} />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="message">{t("contact.form.message")}</label>
            <Textarea id="message" name="message" required placeholder={t("contact.form.messagePlaceholder")} rows={6} />
          </div>
          <Button variant="hero" size="lg" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
