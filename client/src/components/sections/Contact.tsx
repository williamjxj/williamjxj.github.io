import { motion } from "framer-motion";
import { Building2, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";

export default function Contact() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="absolute left-1/4 top-10 h-80 w-80 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-teal-500/12 blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-8 text-center backdrop-blur sm:p-12"
        >
          <SectionHeading eyebrow="06" title={t.contact.title} subtitle={t.contact.subtitle} />

          <p className="-mt-6 mb-2 text-base leading-relaxed text-muted-foreground">
            Whether you need AI-driven automation, full-stack development, or a web platform for
            your business — I'm ready to help.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="glow-violet bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="mailto:jxjwilliam@gmail.com">
                <Mail size={16} /> {t.contact.emailMe}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+12369923846">
                <Phone size={16} /> {t.contact.phone}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/william-jiang-226a7616/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> {t.contact.linkedin}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/williamjxj" target="_blank" rel="noreferrer">
                <Github size={16} /> {t.contact.github}
              </a>
            </Button>
          </div>

          <a
            href="https://www.bestitconsulting.ca"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-accent"
          >
            <Building2 size={15} /> {t.contact.company} — bestitconsulting.ca
          </a>
        </motion.div>
      </div>
    </section>
  );
}
