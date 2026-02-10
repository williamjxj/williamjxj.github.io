import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Neural Networks Design Theme - Tech-Forward Minimalism
 * Hero section features neural network background, gradient text, and glowing accents
 * Projects showcase with staggered grid and hover effects
 * Skills matrix with interactive tags and expertise levels
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "AgenticAP",
      description: "AI-native financial automation platform dedicated to processing heterogeneous invoice formats with RAG and agentic workflows.",
      tags: ["Python", "RAG", "Agentic AI", "FastAPI", "OCR"],
      link: "https://github.com/williamjxj/AgenticAP",
      featured: true,
    },
    {
      title: "AgenticOmni",
      description: "Multi-modal document intelligence platform combining OCR, LLM processing, and agentic AI for enterprise document workflows.",
      tags: ["Python", "AI", "PyTorch", "FastAPI", "LangChain"],
      link: "https://github.com/williamjxj/AgenticOmni",
      featured: true,
    },
    {
      title: "Agentic Proposal Engine",
      description: "AI-powered proposal automation agent with job scraping, requirement analysis, and personalized proposal drafting.",
      tags: ["TypeScript", "Next.js", "RAG", "FastAPI", "AI Agent"],
      link: "https://github.com/williamjxj/agentic-proposal-engine",
      featured: true,
    },
    {
      title: "Site RAG Chatbot",
      description: "RAG-powered chatbot for static websites with content ingestion from sitemaps and documents.",
      tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "OpenAI"],
      link: "https://github.com/williamjxj/site-rag-chatbot",
    },
    {
      title: "BestIT Consultants",
      description: "Corporate website showcasing AI/ML solutions and enterprise digital transformation services.",
      tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/williamjxj/bestitconsultants",
    },
    {
      title: "Face Swap SaaS",
      description: "Production-ready AI face-swapping platform with multi-format support and multiple payment gateways.",
      tags: ["Next.js", "React", "Supabase", "Stripe", "AI"],
      link: "https://github.com/williamjxj/face-swap-poc",
    },
  ];

  const skills = [
    { category: "Frontend", items: ["Next.js", "React.js", "TypeScript", "TailwindCSS", "Shadcn/ui"], level: 95 },
    { category: "Backend", items: ["Node.js", "Express.js", "Python", "FastAPI", "GraphQL"], level: 90 },
    { category: "AI & Automation", items: ["LangChain", "LlamaIndex", "RAG", "Agentic AI", "LLM Integration"], level: 92 },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Supabase", "pgvector"], level: 88 },
    { category: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"], level: 85 },
    { category: "Data & ML", items: ["Kafka", "ElasticSearch", "Prometheus", "PyTorch", "Hugging Face"], level: 80 },
  ];

  const experience = [
    {
      title: "Full-Stack & AI Engineer",
      company: "Best IT Consulting Inc.",
      period: "Oct 2024 - Present",
      highlights: ["Founded and scaled consulting firm", "AI-driven digital solutions", "Node.js, FastAPI, RAG"],
    },
    {
      title: "Senior Full-stack Engineer",
      company: "Xperi",
      period: "Mar 2021 - Sep 2024",
      highlights: ["ML Data Pipelines", "Microservices architecture", "Kubernetes deployment"],
    },
    {
      title: "React/Full-stack Engineer, Software Architect",
      company: "EPAM",
      period: "Dec 2018 - Feb 2020",
      highlights: ["Credit Suisse integration", "Real-time data pipelines", "Team mentorship"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold gradient-text">WJ</div>
          <div className="flex gap-6 items-center">
            <a href="#projects" className="text-sm hover:text-accent transition">Projects</a>
            <a href="#skills" className="text-sm hover:text-accent transition">Skills</a>
            <a href="#experience" className="text-sm hover:text-accent transition">Experience</a>
            <a href="#contact" className="text-sm hover:text-accent transition">Contact</a>
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
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              William Jiang
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Senior Full-Stack & AI Engineer | 20+ Years Building Intelligent Systems
            </p>
            <p className="text-lg text-accent max-w-3xl mx-auto">
              Specializing in <span className="font-semibold">Agentic AI</span>, <span className="font-semibold">RAG Systems</span>, and <span className="font-semibold">Enterprise Automation</span>
            </p>

            <div className="flex gap-4 justify-center pt-8">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-cyan">
                <a href="#projects" className="flex items-center gap-2">
                  View My Work <ExternalLink size={16} />
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://github.com/williamjxj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  GitHub <Github size={16} />
                </a>
              </Button>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured AI & Agentic Projects</h2>
            <p className="text-muted-foreground text-lg">Cutting-edge solutions in AI automation, RAG systems, and intelligent workflows</p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects.filter(p => p.featured).map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-background border-glow hover:glow-pulse p-6 h-full transition-all hover:scale-105 cursor-pointer">
                  <h3 className="text-2xl font-bold mb-3 text-accent">{project.title}</h3>
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
            ))}
          </div>

          {/* Other Projects */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Other Notable Projects</h3>
            {projects.filter(p => !p.featured).map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-background border border-border hover:border-accent/50 p-4 transition-all hover:translate-x-2">
                  <div className="flex justify-between items-start">
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground text-lg">20+ years of experience across full-stack development, AI/ML, and cloud architecture</p>
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
                          <span className="text-sm">{item}</span>
                          <span className="text-xs text-muted-foreground">{skillGroup.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-accent to-secondary h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skillGroup.level}%` }}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Experience</h2>
            <p className="text-muted-foreground text-lg">Building enterprise solutions across startups and Fortune 500 companies</p>
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

      {/* CTA Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold">Let's Build Something Extraordinary</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need AI-driven automation, full-stack development, or enterprise digital transformation, I'm ready to help.
            </p>

            <div className="flex gap-4 justify-center pt-8 flex-wrap">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-cyan">
                <a href="mailto:jxjwilliam@gmail.com" className="flex items-center gap-2">
                  Get in Touch <Mail size={16} />
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://www.linkedin.com/in/william-jiang-226a7616/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  LinkedIn <Linkedin size={16} />
                </a>
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <a href="https://github.com/williamjxj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  GitHub <Github size={16} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 William Jiang. Senior Full-Stack & AI Engineer. Built with Next.js, React, and Tailwind CSS.</p>
          <p className="text-sm mt-2">
            <a href="https://www.bestitconsulting.ca/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80">
              Best IT Consulting
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
