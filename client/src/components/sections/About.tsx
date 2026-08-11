import { motion } from "framer-motion";
import { Building2, Languages, MapPin, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { SectionHeading } from "@/components/sections/SectionHeading";

export default function About() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const facts = [
    { icon: Rocket, label: t.about.building, color: "text-violet-400" },
    { icon: Building2, label: t.about.company, color: "text-orange-400" },
    { icon: MapPin, label: t.about.base, color: "text-teal-400" },
    { icon: Languages, label: t.about.languages, color: "text-blue-400" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="01" title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid items-center gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-sm lg:col-span-2"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-500 via-teal-400 to-orange-400 opacity-70 blur-[2px]" />
              <div className="relative rounded-3xl border border-white/10 bg-card p-3">
                <img
                  src="/william.jpg"
                  alt="William Jiang"
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-foreground">{t.hero.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{t.hero.title1}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {t.about.founder}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <a
                      href="https://www.linkedin.com/in/william-jiang-226a7616/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent/50 hover:text-accent"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/williamjxj"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent/50 hover:text-accent"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">{t.about.bio1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.about.bio2}</p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {facts.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3.5 transition hover:border-accent/40"
                  >
                    <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${fact.color}`}>
                      <Icon size={17} />
                    </span>
                    <span className="text-sm text-foreground">{fact.label}</span>
                  </div>
                );
              })}
            </div>

            <blockquote className="mt-8 rounded-r-2xl border-l-2 border-accent bg-accent/5 py-4 pl-5 pr-4 font-mono text-sm text-muted-foreground">
              “{t.about.motto}”
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
