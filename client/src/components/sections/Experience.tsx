import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { SectionHeading } from "@/components/sections/SectionHeading";

export default function Experience() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const entries = [
    {
      title: t.experience.current.title,
      company: t.experience.current.company,
      period: t.experience.current.period,
      highlights: [
        t.experience.current.highlight1,
        t.experience.current.highlight2,
        t.experience.current.highlight3,
      ],
      current: true,
    },
    {
      title: t.experience.xperi.title,
      company: t.experience.xperi.company,
      period: t.experience.xperi.period,
      highlights: [
        t.experience.xperi.highlight1,
        t.experience.xperi.highlight2,
        t.experience.xperi.highlight3,
      ],
      current: false,
    },
    {
      title: t.experience.epam.title,
      company: t.experience.epam.company,
      period: t.experience.epam.period,
      highlights: [
        t.experience.epam.highlight1,
        t.experience.epam.highlight2,
        t.experience.epam.highlight3,
      ],
      current: false,
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="04"
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-4 left-[7px] top-4 w-px bg-gradient-to-b from-violet-500/70 via-border to-transparent" />
          <div className="space-y-10">
            {entries.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="relative pl-10"
              >
                <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center">
                  <span
                    className={`h-3.5 w-3.5 rounded-full border-2 ${
                      entry.current
                        ? "border-teal-400 bg-teal-400/30 shadow-[0_0_12px_rgba(62,207,142,0.5)]"
                        : "border-violet-400 bg-background"
                    }`}
                  />
                </span>
                <div className="rounded-2xl border border-border bg-card p-6 transition hover:border-violet-500/35">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-foreground">{entry.title}</h3>
                    <span className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{entry.company}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {entry.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-accent">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
