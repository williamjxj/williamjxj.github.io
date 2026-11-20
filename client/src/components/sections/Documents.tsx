import { createElement, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { SectionHeading } from "@/components/sections/SectionHeading";

/** The homepage and /docs/ share the same searchable library and generated catalog. */
export default function Documents() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const docsBase = `${import.meta.env.BASE_URL}docs/`;
  const isChinese = language === "zh";

  useEffect(() => {
    let active = true;
    import(/* @vite-ignore */ `${import.meta.env.BASE_URL}js/documents-library.js`)
      .then(() => {
        if (active) setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="documents" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="05"
          title={t.documents.title}
          subtitle={isChinese
            ? "AI 工程、机器学习与前端实践，持续积累的知识与参考。"
            : "Practical guides and references on AI engineering, machine learning and frontend craft."}
        />

        <div className="mx-auto max-w-6xl">
          {status === "ready" ? createElement("wj-documents-library", { lang: language }) : (
            <p role="status" className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              {status === "loading"
                ? (isChinese ? "正在加载文档库…" : "Loading the document library…")
                : (isChinese ? "无法加载内嵌文档库，请打开完整文档库。" : "The embedded library could not load. Open the full library.")}
            </p>
          )}
          <div className="mt-5 flex justify-end">
            <a href={`${docsBase}?lang=${language}`} className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
              {isChinese ? "打开完整文档库" : "Open full library"}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
