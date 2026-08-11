import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = ["about", "stack", "projects", "experience", "documents", "contact"] as const;

export default function Navbar() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [active, setActive] = useState<string>("about");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const pos = window.scrollY + 120;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about", label: t.nav.about },
    { id: "stack", label: t.nav.stack },
    { id: "projects", label: t.nav.projects },
    { id: "experience", label: t.nav.experience },
    { id: "documents", label: t.nav.documents },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between gap-3">
        <a href="#about" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-teal-400 to-orange-400 font-mono text-sm font-bold text-[#0b0f19] shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-105">
            WJ
          </span>
          <span className="hidden text-sm font-semibold text-foreground sm:block">
            William Jiang
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-sm transition-colors ${
                active === link.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="https://github.com/williamjxj"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-accent/50 hover:text-accent"
          >
            <Github size={16} />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass border-t border-border px-4 pb-4 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm ${
                  active === link.id
                    ? "bg-primary/10 text-accent"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/williamjxj"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
