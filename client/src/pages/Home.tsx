import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown,
  Bot,
  FileText,
  Lightbulb,
  MessageCircle,
  Building2,
  Camera,
  Calculator,
  BookOpen,
  ScrollText,
  Phone
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useCountUp } from "@/hooks/useCountUp";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

/**
 * Neural Networks Design Theme - Tech-Forward Minimalism
 * Hero section features neural network background, gradient text, and glowing accents
 * Projects showcase with staggered grid and hover effects
 * Skills matrix with interactive tags and expertise levels
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("projects");
  const flipTextRef = useRef<HTMLSpanElement>(null);
  
  // Language and translations
  const { language } = useLanguage();
  const t = useTranslations(language);

  // Animated counter for stats
  const yearsCount = useCountUp({ end: 20, duration: 2000 });
  const projectsCount = useCountUp({ end: 50, duration: 2000 });
  const systemsCount = useCountUp({ end: 6, duration: 2000 });

  // GSAP flip animation for rotating titles
  useEffect(() => {
    const titles = [
      t.hero.title1,
      t.hero.title2,
      t.hero.title3,
      t.hero.title4,
    ];
    
    let currentIndex = 0;
    
    const animateText = () => {
      if (flipTextRef.current) {
        gsap.to(flipTextRef.current, {
          duration: 0.5,
          opacity: 0,
          y: -20,
          ease: "power2.in",
          onComplete: () => {
            currentIndex = (currentIndex + 1) % titles.length;
            if (flipTextRef.current) {
              flipTextRef.current.textContent = titles[currentIndex];
              gsap.to(flipTextRef.current, {
                duration: 0.5,
                opacity: 1,
                y: 0,
                ease: "power2.out"
              });
            }
          }
        });
      }
    };

    const interval = setInterval(animateText, 3000);
    return () => clearInterval(interval);
  }, [t.hero.title1, t.hero.title2, t.hero.title3, t.hero.title4]);

  // Active section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ["projects", "skills", "experience", "documents", "contact"];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: t.projects.agenticAP.title,
      description: t.projects.agenticAP.description,
      tags: ["Python", "RAG", "Agentic AI", "FastAPI", "OCR"],
      link: "https://github.com/williamjxj/AgenticAP",
      icon: Bot,
      featured: true,
    },
    {
      title: t.projects.agenticOmni.title,
      description: t.projects.agenticOmni.description,
      tags: ["Python", "AI", "PyTorch", "FastAPI", "LangChain"],
      link: "https://github.com/williamjxj/AgenticOmni",
      icon: FileText,
      featured: true,
    },
    {
      title: t.projects.proposalEngine.title,
      description: t.projects.proposalEngine.description,
      tags: ["TypeScript", "Next.js", "RAG", "FastAPI", "AI Agent"],
      link: "https://github.com/williamjxj/agentic-proposal-engine",
      icon: Lightbulb,
      featured: true,
    },
    {
      title: t.projects.langGraphAccounting.title,
      description: t.projects.langGraphAccounting.description,
      tags: ["Python", "LangGraph", "Agentic AI", "LangChain", "Finance"],
      link: "https://github.com/williamjxj/agentic-langgraph-accounting",
      icon: Calculator,
      featured: true,
    },
    {
      title: t.projects.siteRagChatbot.title,
      description: t.projects.siteRagChatbot.description,
      tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "OpenAI"],
      link: "https://github.com/williamjxj/site-rag-chatbot",
      icon: MessageCircle,
    },
    {
      title: t.projects.bestItConsultants.title,
      description: t.projects.bestItConsultants.description,
      tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/williamjxj/bestitconsultants",
      icon: Building2,
    },
    {
      title: t.projects.faceSwap.title,
      description: t.projects.faceSwap.description,
      tags: ["Next.js", "React", "Supabase", "Stripe", "AI"],
      link: "https://github.com/williamjxj/face-swap-poc",
      icon: Camera,
    },
  ];

  const skills = [
    { 
      category: t.skills.frontend, 
      items: [
        { name: "Next.js", level: 95 },
        { name: "React.js", level: 92 },
        { name: "TypeScript", level: 88 },
        { name: "TailwindCSS", level: 85 },
        { name: "Shadcn/ui", level: 78 }
      ]
    },
    { 
      category: t.skills.backend, 
      items: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "Python", level: 82 },
        { name: "FastAPI", level: 75 },
        { name: "GraphQL", level: 68 }
      ]
    },
    { 
      category: t.skills.aiAutomation, 
      items: [
        { name: "LangChain", level: 92 },
        { name: "LlamaIndex", level: 88 },
        { name: "RAG", level: 90 },
        { name: "Agentic AI", level: 85 },
        { name: "LLM Integration", level: 80 }
      ]
    },
    { 
      category: t.skills.databases, 
      items: [
        { name: "PostgreSQL", level: 88 },
        { name: "MongoDB", level: 82 },
        { name: "Supabase", level: 78 },
        { name: "pgvector", level: 72 }
      ]
    },
    { 
      category: t.skills.cloudDevops, 
      items: [
        { name: "AWS", level: 85 },
        { name: "GCP", level: 78 },
        { name: "Docker", level: 82 },
        { name: "Kubernetes", level: 72 },
        { name: "CI/CD", level: 80 }
      ]
    },
    { 
      category: t.skills.dataML, 
      items: [
        { name: "Kafka", level: 80 },
        { name: "ElasticSearch", level: 75 },
        { name: "Prometheus", level: 70 },
        { name: "PyTorch", level: 65 },
        { name: "Hugging Face", level: 68 }
      ]
    },
  ];

  const experience = [
    {
      title: t.experience.current.title,
      company: t.experience.current.company,
      period: t.experience.current.period,
      highlights: [t.experience.current.highlight1, t.experience.current.highlight2, t.experience.current.highlight3],
    },
    {
      title: t.experience.xperi.title,
      company: t.experience.xperi.company,
      period: t.experience.xperi.period,
      highlights: [t.experience.xperi.highlight1, t.experience.xperi.highlight2, t.experience.xperi.highlight3],
    },
    {
      title: t.experience.epam.title,
      company: t.experience.epam.company,
      period: t.experience.epam.period,
      highlights: [t.experience.epam.highlight1, t.experience.epam.highlight2, t.experience.epam.highlight3],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <img src="/william.jpg" alt="William Jiang" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
            <div className="relative logo-ai-effect">
              <span className="text-base sm:text-xl font-bold gradient-text">William Jiang</span>
              <motion.div
                className="absolute -right-1 -top-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -right-2 top-1 w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </a>
          <div className="flex gap-2 sm:gap-4 md:gap-6 items-center overflow-x-auto scrollbar-hide">
            <a 
              href="#projects" 
              className={`text-xs sm:text-sm transition relative pb-1 whitespace-nowrap flex-shrink-0 ${
                activeSection === "projects" 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" 
                  : "text-foreground hover:text-accent"
              }`}
            >
              {t.nav.projects}
            </a>
            <a 
              href="#skills" 
              className={`text-xs sm:text-sm transition relative pb-1 whitespace-nowrap flex-shrink-0 ${
                activeSection === "skills" 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" 
                  : "text-foreground hover:text-accent"
              }`}
            >
              {t.nav.skills}
            </a>
            <a 
              href="#experience" 
              className={`text-xs sm:text-sm transition relative pb-1 whitespace-nowrap flex-shrink-0 ${
                activeSection === "experience" 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" 
                  : "text-foreground hover:text-accent"
              }`}
            >
              {t.nav.experience}
            </a>
            <a 
              href="#documents" 
              className={`text-xs sm:text-sm transition relative pb-1 whitespace-nowrap flex-shrink-0 ${
                activeSection === "documents" 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" 
                  : "text-foreground hover:text-accent"
              }`}
            >
              {t.nav.documents}
            </a>
            <a 
              href="#contact" 
              className={`text-xs sm:text-sm transition relative pb-1 whitespace-nowrap flex-shrink-0 ${
                activeSection === "contact" 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent" 
                  : "text-foreground hover:text-accent"
              }`}
            >
              {t.nav.contact}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background with neural network visualization */}
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/mOzPEUDGWfFusrKor0YfOC/sandbox/Xgs6H3uXXsAI6I4fb7p6MN-img-1_1770744979000_na1fn_aGVyby1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbU96UEVVREdXZkZ1c3JLb3IwWWZPQy9zYW5kYm94L1hnczZIM3VYWHNBSTZJNGZiN3A2TU4taW1nLTFfMTc3MDc0NDk3OTAwMF9uYTFmbl9hR1Z5YnkxdVpYVnlZV3d0Ym1WMGQyOXlhdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=R9-3Y60DpTvDBAgr4N7BxFyh38CH2wSaYc2sVt~XcZVSMQgHk8GHhNAargZFKQdiXK5vhIlohcQBr3h0GfsGWfzN1riPTUAlYWqcprPrsK1lXt5Xd1h6LKOUl22ciWmiXRiw1ePi7t0MTY68Nh8LlnYSf87NnHOyBN7B7BHD2NsgIDKX0SFkxfkmD3gPf3DlG-PVlh-2d0ZfpTYFN9ov~RmkLMeuYGmuU66fc3lGLGddH6vZmz7yJveQrmpS-0-CaljXr9Mqz2KQy23Bn0Y1ctJlIRFrM~A5EwnRsbnGoCjJeKcppOoNhZQwJM6VEp-yDAIqRGZktpia-yDG9bNI0A__"
            alt="Neural Network Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Available for projects badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <a 
                href="mailto:jxjwilliam@gmail.com" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full hover:bg-accent/20 hover:border-accent/50 transition-all cursor-pointer"
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm text-accent font-medium">Available for projects</span>
              </a>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              {t.hero.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t.hero.title1}
            </p>
            
            {/* Animated rotating titles */}
            <div className="text-lg md:text-xl max-w-2xl mx-auto h-8 flex items-center justify-center">
              <span ref={flipTextRef} className="text-accent font-medium">{t.hero.title1}</span>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            <div className="flex gap-4 justify-center pt-8 flex-wrap">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-cyan">
                <a href="#projects" className="flex items-center gap-2">
                  {t.hero.viewWork} <ChevronDown size={16} />
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://github.com/williamjxj?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github size={16} /> {t.hero.github}
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://www.linkedin.com/in/william-jiang-226a7616/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin size={16} /> {t.hero.linkedin}
                </a>
              </Button>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onViewportEnter={() => {
                if (!yearsCount.hasStarted) {
                  yearsCount.startCounting();
                  projectsCount.startCounting();
                  systemsCount.startCounting();
                }
              }}
              viewport={{ once: true, amount: 0.5 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto pt-12 px-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                  {yearsCount.count}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{t.hero.yearsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                  {projectsCount.count}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{t.hero.projectsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                  {systemsCount.count}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{t.hero.systemsLabel}</div>
              </div>
            </motion.div>

            {/* Founder Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6"
            >
              <a 
                href="https://www.bestitconsulting.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition inline-flex items-center gap-2"
              >
                Founder, Best IT Consulting Inc. <ExternalLink size={14} />
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="text-accent" size={32} />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.projects.title}</h2>
            <p className="text-muted-foreground text-lg">{t.projects.subtitle}</p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects.filter(p => p.featured).map((project, idx) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card className="bg-background border-glow hover:glow-pulse p-6 h-full transition-all hover:scale-105 cursor-pointer">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                        <IconComponent className="text-accent" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-accent flex-1">{project.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 flex items-center gap-2">
                      View on GitHub <ExternalLink size={16} />
                    </a>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Other Projects */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Other Notable Projects</h3>
            {projects.filter(p => !p.featured).map((project, idx) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card className="bg-background border border-border hover:border-accent/50 p-4 transition-all hover:translate-x-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-accent/10 rounded-lg border border-accent/30 mt-1">
                          <IconComponent className="text-accent" size={20} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-accent mb-2">{project.title}</h4>
                          <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.skills.title}</h2>
            <p className="text-muted-foreground text-lg">{t.skills.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-card border-glow p-6 h-full">
                  <h3 className="text-xl font-bold mb-4 text-accent">{skillGroup.category}</h3>
                  <div className="space-y-3">
                    {skillGroup.items.map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground">{item.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-accent to-secondary h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.experience.title}</h2>
            <p className="text-muted-foreground text-lg">{t.experience.subtitle}</p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-background border border-border p-6 hover:border-accent/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-accent">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-foreground flex items-start gap-3">
                        <span className="text-accent mt-1">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.documents.title}</h2>
            <p className="text-muted-foreground text-lg">{t.documents.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-background border-glow hover:glow-pulse p-6 h-full transition-all hover:scale-105 cursor-pointer">
                <a href="/docs/autodrive-ml-training-overview.docx" download className="block">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                      <BookOpen className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-accent flex-1 pt-2">AutoDrive ML Training Overview</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive overview of machine learning training workflows for autonomous driving systems.
                  </p>
                  <div className="flex items-center gap-2 text-accent hover:text-accent/80">
                    <ExternalLink size={16} />
                    <span>Download Document</span>
                  </div>
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-background border-glow hover:glow-pulse p-6 h-full transition-all hover:scale-105 cursor-pointer">
                <a href="/docs/autodrive-ml-training-details.docx" download className="block">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                      <ScrollText className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-accent flex-1 pt-2">AutoDrive ML Training Details</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Detailed technical specifications and implementation guidelines for ML training pipelines.
                  </p>
                  <div className="flex items-center gap-2 text-accent hover:text-accent/80">
                    <ExternalLink size={16} />
                    <span>Download Document</span>
                  </div>
                </a>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-background border-glow hover:glow-pulse p-6 h-full transition-all hover:scale-105 cursor-pointer">
                <a href="/docs/frontend-animation-reference.html" target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                      <ScrollText className="text-accent" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-accent flex-1 pt-2">Frontend Animation Reference</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Opens the frontend animation reference as a standalone HTML page.
                  </p>
                  <div className="flex items-center gap-2 text-accent hover:text-accent/80">
                    <ExternalLink size={16} />
                    <span>Open Reference Page</span>
                  </div>
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/mOzPEUDGWfFusrKor0YfOC/sandbox/Xgs6H3uXXsAI6I4fb7p6MN-img-4_1770744978000_na1fn_YWdlbnRpYy1haS1jb25jZXB0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvbU96UEVVREdXZkZ1c3JLb3IwWWZPQy9zYW5kYm94L1hnczZIM3VYWHNBSTZJNGZiN3A2TU4taW1nLTRfMTc3MDc0NDk3ODAwMF9uYTFmbl9ZV2RsYm5ScFl5MWhhUzFqYjI1alpYQjAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MTakZbgtVYbqzpRZeEpGMSnnLBBRmknXemeCnYYoktq5FofKlz8-oasSrPxfwJAKUIuMLOxEahs09Bw0HEHmzqdJX7oegkBOoXO5yrs8T1jwQ-xmGZseBZaxNNgs-0ntwSiQEMAqmptc4l7dRGRXw71~biiO6zH1xrZO2Kcqb0TxmFNN4EqUWzFEzfLeK5JbW47JGfzqKnLRYtV83E2~ddnGrQRfIqE-wo9zE2ZGIqc6uTNXsrxeiaW0ud4Q8Q2d7HrJvKrm1EBbJSMFsqo1KW84NTz7gC65EBx6mI1eGO0I-BILTQMlX6sFTmfucMFDBasr-61UMi-fF4cGwOYQlg__"
            alt="Agentic AI Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{t.contact.title}</h2>
              <p className="text-lg text-accent">{t.contact.subtitle}</p>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need AI-driven automation, full-stack development, or enterprise digital transformation, I'm ready to help.
            </p>

            <div className="flex gap-4 justify-center pt-8 flex-wrap">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-cyan">
                <a href="mailto:jxjwilliam@gmail.com" className="flex items-center gap-2">
                  <Mail size={16} /> {t.contact.emailMe}
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="tel:+12369923846" className="flex items-center gap-2">
                  <Phone size={16} /> {t.contact.phone}
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://www.linkedin.com/in/william-jiang-226a7616/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin size={16} /> {t.contact.linkedin}
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://github.com/williamjxj?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github size={16} /> {t.contact.github}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>{t.footer.copyright}</p>
          <p className="text-sm mt-2">
            <a href="https://www.bestitconsulting.ca/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
              {t.footer.companyLink}
            </a>
            {" "} | {" "}
            <a href="https://www.bestitconsultants.ca/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
              BestIT Consultants
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
