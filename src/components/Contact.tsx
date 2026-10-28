import { useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "unavailable"
  >("idle");
  const inFlight = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (
      ["name", "email", "message"].some(
        (key) => !String(data.get(key) ?? "").trim(),
      )
    )
      return;
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key) {
      setStatus("unavailable");
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      await emailjs.sendForm(service, template, form, { publicKey: key });
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <section id="contato" className="contact-section section">
      <div className="contact-copy">
        <p className="eyebrow">{t("contact.label")}</p>
        <h2>
          {t("contact.title")}
          <br />
          <span className="serif">{t("contact.emphasis")}</span>
        </h2>
        <p>{t("contact.intro")}</p>
        <div className="direct-contact">
          <span className="mono">{t("contact.direct")}</span>
          <a href="mailto:felipe.vergara.chico@gmail.com">
            felipe.vergara.chico@gmail.com
            <ArrowUpRight size={20} />
          </a>
          <div className="social-links">
            <a
              href="https://github.com/FelipeVergaraChico"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/felipe-vergara-chico/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <form onSubmit={submit} className="contact-form">
        <label htmlFor="contact-name">{t("contact.name")}</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder={t("contact.namePlaceholder")}
          required
          maxLength={120}
          pattern=".*\S.*"
        />
        <label htmlFor="contact-email">{t("contact.email")}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("contact.emailPlaceholder")}
          required
          maxLength={254}
        />
        <label htmlFor="contact-message">{t("contact.message")}</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder={t("contact.messagePlaceholder")}
          required
          maxLength={5000}
          rows={4}
        />
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">{t("contact.bot")}</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          className="button contact-submit"
          disabled={status === "sending"}
        >
          {t(status === "sending" ? "contact.sending" : "contact.send")}
          <ArrowUpRight size={20} />
        </button>
        <p className="form-privacy">{t("contact.privacy")}</p>
        <p className={"form-status " + status} role="status" aria-live="polite">
          {status !== "idle" && status !== "sending"
            ? t("contact." + status)
            : ""}
        </p>
      </form>
    </section>
  );
}
