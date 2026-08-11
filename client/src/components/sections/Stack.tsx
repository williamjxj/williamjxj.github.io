import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { SectionHeading } from "@/components/sections/SectionHeading";

const SKILL_ICONS =
  "https://skillicons.dev/icons?i=python,ts,js,react,nextjs,tailwind,nodejs,fastapi,supabase,postgres,docker,vercel,openai,claude&theme=dark&perline=14";

export default function Stack() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const skillGroups = [
    {
      category: t.stack.frontend,
      items: [
        { name: "Next.js", level: 95 },
        { name: "React.js", level: 92 },
        { name: "TypeScript", level: 88 },
        { name: "TailwindCSS", level: 85 },
      ],
    },
    {
      category: t.stack.backend,
      items: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 84 },
        { name: "FastAPI", level: 78 },
        { name: "Express.js", level: 85 },
      ],
    },
    {
      category: t.stack.aiAutomation,
      items: [
        { name: "LangChain", level: 92 },
        { name: "RAG", level: 90 },
        { name: "Agentic AI", level: 86 },
        { name: "LLM Integration", level: 82 },
      ],
    },
    {
      category: t.stack.databases,
      items: [
        { name: "PostgreSQL", level: 88 },
        { name: "Supabase", level: 80 },
        { name: "MongoDB", level: 78 },
        { name: "pgvector", level: 72 },
      ],
    },
    {
      category: t.stack.cloudDevops,
      items: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 84 },
        { name: "Kubernetes", level: 72 },
        { name: "CI/CD", level: 80 },
      ],
    },
    {
      category: t.stack.dataML,
      items: [
        { name: "Kafka", level: 80 },
        { name: "ElasticSearch", level: 75 },
        { name: "PyTorch", level: 68 },
        { name: "Hugging Face", level: 70 },
      ],
    },
  ];

  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
      </div>
      <div className="container relative">
        <SectionHeading eyebrow="02" title={t.stack.title} subtitle={t.stack.subtitle} />

        <div className="mx-auto mb-14 max-w-3xl rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
          <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Core stack
          </p>
          <img
            src={SKILL_ICONS}
            alt="Python, TypeScript, JavaScript, React, Next.js, Tailwind, Node.js, FastAPI, Supabase, PostgreSQL, Docker, Vercel, OpenAI, Claude"
            loading="lazy"
            className="mx-auto"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-violet-500/35"
            >
              <h3 className="mb-5 text-lg font-bold text-accent">{group.category}</h3>
              <div className="space-y-4">
                {group.items.map((item, i) => (
                  <div key={i}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-teal-400 to-orange-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
