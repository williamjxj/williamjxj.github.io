import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import TerminalCard from "@/components/sections/TerminalCard";

gsap.registerPlugin(TextPlugin);

const PARTICLES = [
  { left: "10%", top: "26%", size: 5, delay: "0s", color: "#A78BFA" },
  { left: "22%", top: "74%", size: 4, delay: "1.2s", color: "#3ECF8E" },
  { left: "38%", top: "16%", size: 3, delay: "2.4s", color: "#D97757" },
  { left: "52%", top: "84%", size: 4, delay: "0.6s", color: "#A78BFA" },
  { left: "66%", top: "22%", size: 3, delay: "1.8s", color: "#3ECF8E" },
  { left: "84%", top: "62%", size: 5, delay: "3s", color: "#D97757" },
  { left: "93%", top: "28%", size: 3, delay: "0.9s", color: "#3ECF8E" },
  { left: "76%", top: "88%", size: 4, delay: "2.1s", color: "#A78BFA" },
];

export default function Hero() {
  const { language } = useLanguage();
  const t = useTranslations(language);
  const flipRef = useRef<HTMLSpanElement>(null);

  const yearsCount = useCountUp({ end: 20, duration: 2000 });
  const projectsCount = useCountUp({ end: 50, duration: 2000 });
  const systemsCount = useCountUp({ end: 6, duration: 2000 });

  useEffect(() => {
    const titles = [t.hero.title1, t.hero.title2, t.hero.title3, t.hero.title4];
    let index = 0;
    if (flipRef.current) {
      flipRef.current.textContent = titles[0];
    }

    const interval = setInterval(() => {
      const el = flipRef.current;
      if (!el) return;
      gsap.to(el, {
        duration: 0.35,
        opacity: 0,
        y: -14,
        ease: "power2.in",
        onComplete: () => {
          index = (index + 1) % titles.length;
          el.textContent = titles[index];
          gsap.to(el, { duration: 0.35, opacity: 1, y: 0, ease: "power2.out" });
        },
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [t.hero.title1, t.hero.title2, t.hero.title3, t.hero.title4]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              animationDelay: p.delay,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="mailto:jxjwilliam@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition hover:border-accent/60 hover:bg-accent/15"
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
              {t.hero.available}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-mono text-sm text-muted-foreground"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gradient mt-2 text-5xl font-extrabold leading-[1.05] sm:text-6xl xl:text-7xl"
          >
            {t.hero.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 h-9 overflow-hidden"
          >
            <span className="inline-flex items-center gap-2 text-xl font-semibold text-accent sm:text-2xl">
              <span className="text-orange-400">▸</span>
              <span ref={flipRef} className="inline-block" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild className="glow-violet bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#projects">
                {t.hero.viewWork} <ArrowDown size={16} className="ml-1" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/williamjxj" target="_blank" rel="noreferrer">
                <Github size={16} /> {t.hero.github}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://www.linkedin.com/in/william-jiang-226a7616/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> {t.hero.linkedin}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            onViewportEnter={() => {
              if (!yearsCount.hasStarted) {
                yearsCount.startCounting();
                projectsCount.startCounting();
                systemsCount.startCounting();
              }
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4"
          >
            <div className="rounded-2xl border border-border bg-card/60 px-4 py-5 text-center backdrop-blur">
              <div className="text-2xl font-bold text-accent sm:text-3xl">
                {yearsCount.count}+
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {t.hero.yearsLabel}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 px-4 py-5 text-center backdrop-blur">
              <div className="text-2xl font-bold text-accent sm:text-3xl">
                {projectsCount.count}+
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {t.hero.projectsLabel}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 px-4 py-5 text-center backdrop-blur">
              <div className="text-2xl font-bold text-accent sm:text-3xl">
                {systemsCount.count}+
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {t.hero.systemsLabel}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="hidden sm:block"
        >
          <TerminalCard />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition hover:text-accent"
        aria-label={t.hero.scrollHint}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
            {t.hero.scrollHint}
          </span>
          <ArrowDown size={18} />
        </motion.div>
      </a>
    </section>
  );
}
