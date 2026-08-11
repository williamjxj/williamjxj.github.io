import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "stack", label: t.nav.stack },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#about" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-teal-400 to-orange-400 font-mono text-sm font-bold text-[#0b0f19]">
              WJ
            </span>
            <span className="text-base font-bold text-foreground">William Jiang</span>
          </a>
          <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-xs text-muted-foreground transition hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.bestitconsulting.ca"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground transition hover:text-accent"
            >
              {t.footer.companyLink}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/williamjxj"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent/50 hover:text-accent"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/william-jiang-226a7616/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent/50 hover:text-accent"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:jxjwilliam@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent/50 hover:text-accent"
            >
              <Mail size={16} />
            </a>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">{t.footer.copyright}</p>
            <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/70">
              {t.footer.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
