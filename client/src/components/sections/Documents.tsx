import { motion } from "framer-motion";
import { BookOpen, Download, ScrollText, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { SectionHeading } from "@/components/sections/SectionHeading";

export default function Documents() {
  const { language } = useLanguage();
  const t = useTranslations(language);

  const docs = [
    {
      icon: BookOpen,
      title: t.documents.overviewTitle,
      description: t.documents.overviewDesc,
      href: "/docs/autodrive-ml-training-overview.docx",
      download: true,
      action: t.documents.download,
    },
    {
      icon: ScrollText,
      title: t.documents.detailsTitle,
      description: t.documents.detailsDesc,
      href: "/docs/autodrive-ml-training-details.docx",
      download: true,
      action: t.documents.download,
    },
    {
      icon: Wand2,
      title: t.documents.animationTitle,
      description: t.documents.animationDesc,
      href: "/docs/frontend-animation-reference.html",
      download: false,
      action: t.documents.open,
    },
  ];

  return (
    <section id="documents" className="relative py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="05"
          title={t.documents.title}
          subtitle={t.documents.subtitle}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {docs.map((doc, i) => {
            const Icon = doc.icon;
            const isDownload = doc.download;
            return (
              <motion.a
                key={i}
                href={doc.href}
                {...(isDownload ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-orange-500/15 to-violet-500/10 text-orange-400">
                  <Icon size={20} />
                </span>
                <h3 className="text-lg font-bold text-foreground transition group-hover:text-orange-400">
                  {doc.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {doc.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-medium text-accent transition group-hover:text-accent/80">
                  <Download size={15} />
                  {doc.action}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
