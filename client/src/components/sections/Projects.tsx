import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { SectionHeading } from "@/components/sections/SectionHeading";

type Project = {
  key: "autobidder" | "manusShop" | "faceSwap" | "bidmaster" | "uploadImage" | "jqueryPs";
  icon: string;
  repo: string;
  tags: string[];
  lang: string;
  langColor: string;
};

const FEATURED: Project[] = [
  {
    key: "autobidder",
    icon: "🤖",
    repo: "AutoBidder",
    tags: ["TypeScript", "AI Agent", "Automation", "RAG"],
    lang: "TypeScript",
    langColor: "#3178C6",
  },
  {
    key: "manusShop",
    icon: "🛍️",
    repo: "manus-ai-shop",
    tags: ["Next.js", "Tailwind", "Stripe", "Supabase"],
    lang: "TypeScript",
    langColor: "#3178C6",
  },
  {
    key: "faceSwap",
    icon: "🎭",
    repo: "face-swap-poc",
    tags: ["Next.js 15", "React 19", "Supabase", "Payments"],
    lang: "JavaScript",
    langColor: "#F7DF1E",
  },
  {
    key: "bidmaster",
    icon: "🎯",
    repo: "bidmaster",
    tags: ["Next.js", "TypeScript", "Supabase"],
    lang: "TypeScript",
    langColor: "#3178C6",
  },
];

const OTHERS: Project[] = [
  {
    key: "uploadImage",
    icon: "📤",
    repo: "upload-image",
    tags: ["Node.js", "CLI"],
    lang: "JavaScript",
    langColor: "#F7DF1E",
  },
  {
    key: "jqueryPs",
    icon: "🖌️",
    repo: "jQuery-Photoshop-UI",
    tags: ["jQuery", "Photoshop", "UI"],
    lang: "JavaScript",
    langColor: "#F7DF1E",
  },
];

function StarBadge({ repo }: { repo: string }) {
  return (
    <img
      src={`https://img.shields.io/github/stars/williamjxj/${repo}?style=flat&label=stars&color=8B5CF6`}
      alt="GitHub stars"
      loading="lazy"
    />
  );
}

function ForkBadge({ repo }: { repo: string }) {
  return (
    <img
      src={`https://img.shields.io/github/forks/williamjxj/${repo}?style=flat&label=forks&color=3ECF8E`}
      alt="GitHub forks"
      loading="lazy"
    />
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const titleOf = (p: Project) => t.projects[p.key].title;
  const descOf = (p: Project) => t.projects[p.key].description;

  const renderCard = (p: Project, large: boolean) => (
    <a
      href={`https://github.com/williamjxj/${p.repo}`}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-teal-400/10 text-xl">
          {p.icon}
        </span>
        <Github
          size={18}
          className="mt-1 text-muted-foreground transition group-hover:text-accent"
        />
      </div>
      <h3 className={`font-bold text-foreground transition group-hover:text-accent ${large ? "text-lg" : "text-base"}`}>
        {titleOf(p)}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {descOf(p)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: p.langColor }}
          />
          {p.lang}
        </span>
        <StarBadge repo={p.repo} />
        <ForkBadge repo={p.repo} />
        <span className="ml-auto flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition group-hover:opacity-100">
          View <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  );

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="03" title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid gap-6 md:grid-cols-2">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.repo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
            >
              {renderCard(p, true)}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {OTHERS.map((p, i) => (
            <motion.div
              key={p.repo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {renderCard(p, false)}
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center">
          <a
            href="https://github.com/williamjxj?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:text-accent/80"
          >
            {t.projects.viewAll} <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
    </section>
  );
}
