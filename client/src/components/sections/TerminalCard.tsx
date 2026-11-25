import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const SLIDES = [
  {
    id: "genai",
    image: "/illustrations/genai-creator.webp",
    alt: ["Comic robot creating colorful new ideas", "卡通机器人正在创作缤纷新点子"],
    title: ["Generative AI", "生成式 AI"],
    description: [
      "Ideas become images, language, and new possibilities.",
      "将创意变成图像、语言与新的可能。",
    ],
    tab: ["GenAI", "生成式"],
  },
  {
    id: "agentic",
    image: "/illustrations/agentic-ai.webp",
    alt: ["Comic robot following a tool-assisted task plan", "卡通机器人正按计划调用工具完成任务"],
    title: ["Agentic AI", "智能体 AI"],
    description: [
      "Plan a path, choose tools, and move work forward.",
      "规划路径、选择工具，让任务持续向前。",
    ],
    tab: ["Agentic", "智能体"],
  },
  {
    id: "multi-agent",
    image: "/illustrations/multi-agent.webp",
    alt: ["Three comic robots collaborating on one shared outcome", "三位卡通机器人协作完成同一个目标"],
    title: ["Multi-agent systems", "多智能体系统"],
    description: [
      "Specialists collaborate around one shared outcome.",
      "不同专长的智能体围绕共同目标协作。",
    ],
    tab: ["Multi-agent", "多智能体"],
  },
  {
    id: "rag",
    image: "/illustrations/rag-retrieval.webp",
    alt: ["Comic robot retrieving source documents to ground an answer", "卡通机器人检索来源文档，为答案提供依据"],
    title: ["Retrieval-augmented generation", "检索增强生成"],
    description: [
      "Retrieve trusted sources and ground every answer.",
      "检索可信来源，让每个答案都有据可依。",
    ],
    tab: ["RAG", "RAG"],
  },
  {
    id: "ship",
    image: "/illustrations/ship-it.webp",
    alt: ["Comic robot launching a finished software product", "卡通机器人正发射已完成的软件产品"],
    title: ["From idea to production", "从创意到生产落地"],
    description: [
      "Turn useful ideas into software people can rely on.",
      "将有价值的想法变成可靠、可用的软件。",
    ],
    tab: ["Ship it", "交付"],
  },
] as const;

export default function TerminalCard() {
  const { language } = useLanguage();
  const isChinese = language === "zh";
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  const text = (pair: readonly [string, string]) => (isChinese ? pair[1] : pair[0]);

  return (
    <div
      className="hero-showcase mx-auto w-full max-w-[540px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-violet-200/90">
          {isChinese ? "AI 与工程" : "AI + Engineering"}
        </span>
        <span className="font-mono text-xs text-slate-300/75">WJ / Vancouver</span>
      </div>

      <div className="hero-orbit" aria-hidden="true" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          id="hero-active-slide"
          role="tabpanel"
          aria-labelledby={`hero-tab-${slide.id}`}
          aria-label={text(slide.title)}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.985, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
          className="absolute inset-0 z-[2]"
        >
          <div className="absolute inset-x-0 bottom-[25%] top-[16%] flex items-center justify-center max-[639px]:bottom-[31%]">
            <img
              src={slide.image}
              alt={text(slide.alt)}
              className="hero-mascot h-full max-h-[390px] w-auto max-w-[94%] object-contain"
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              draggable={false}
            />
          </div>

          <div className="absolute inset-x-5 bottom-[82px] text-center sm:inset-x-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-200/85">
              {text(slide.tab)}
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
              {text(slide.title)}
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-slate-300">
              {text(slide.description)}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        role="tablist"
        aria-label={isChinese ? "AI 插画主题" : "AI illustration topics"}
        className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-1.5 px-4 sm:gap-2"
      >
        {SLIDES.map((item, index) => (
          <button
            key={item.id}
            id={`hero-tab-${item.id}`}
            type="button"
            role="tab"
            aria-label={text(item.title)}
            aria-selected={activeIndex === index}
            aria-controls="hero-active-slide"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              let nextIndex: number | undefined;
              if (event.key === "ArrowRight") nextIndex = (index + 1) % SLIDES.length;
              if (event.key === "ArrowLeft") nextIndex = (index + SLIDES.length - 1) % SLIDES.length;
              if (event.key === "Home") nextIndex = 0;
              if (event.key === "End") nextIndex = SLIDES.length - 1;
              if (nextIndex !== undefined) {
                event.preventDefault();
                setActiveIndex(nextIndex);
                document.getElementById(`hero-tab-${SLIDES[nextIndex].id}`)?.focus();
              }
            }}
            className="flex h-10 min-w-10 items-center justify-center rounded-full px-2 transition-colors hover:bg-white/10 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "w-7 bg-emerald-300" : "w-2 bg-slate-400/70"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
