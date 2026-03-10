import { Language } from "@/contexts/LanguageContext";

export interface Translations {
  nav: {
    projects: string;
    skills: string;
    experience: string;
    documents: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    description: string;
    viewWork: string;
    github: string;
    linkedin: string;
    yearsLabel: string;
    projectsLabel: string;
    systemsLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    agenticAP: {
      title: string;
      description: string;
    };
    agenticOmni: {
      title: string;
      description: string;
    };
    proposalEngine: {
      title: string;
      description: string;
    };
    langGraphAccounting: {
      title: string;
      description: string;
    };
    siteRagChatbot: {
      title: string;
      description: string;
    };
    bestItConsultants: {
      title: string;
      description: string;
    };
    faceSwap: {
      title: string;
      description: string;
    };
  };
  skills: {
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    aiAutomation: string;
    databases: string;
    cloudDevops: string;
    dataML: string;
  };
  experience: {
    title: string;
    subtitle: string;
    current: {
      title: string;
      company: string;
      period: string;
      highlight1: string;
      highlight2: string;
      highlight3: string;
    };
    xperi: {
      title: string;
      company: string;
      period: string;
      highlight1: string;
      highlight2: string;
      highlight3: string;
    };
    epam: {
      title: string;
      company: string;
      period: string;
      highlight1: string;
      highlight2: string;
      highlight3: string;
    };
  };
  documents: {
    title: string;
    subtitle: string;
    resume: string;
    downloadResume: string;
    coverLetter: string;
    downloadCoverLetter: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailMe: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  footer: {
    copyright: string;
    companyLink: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      documents: "Documents",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "William Jiang",
      title1: "Full-Stack Engineer",
      title2: "AI/ML Architect",
      title3: "RAG Systems Expert",
      title4: "Enterprise Solutions",
      description: "20+ years building intelligent systems across startups and Fortune 500 companies. Specializing in agentic AI, RAG pipelines, and enterprise digital transformation.",
      viewWork: "View My Work",
      github: "GitHub",
      linkedin: "LinkedIn",
      yearsLabel: "Years Experience",
      projectsLabel: "Projects Delivered",
      systemsLabel: "AI Systems Built",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Cutting-edge AI and full-stack solutions",
      agenticAP: {
        title: "AgenticAP",
        description: "AI-native financial automation platform dedicated to processing heterogeneous invoice formats with RAG and agentic workflows.",
      },
      agenticOmni: {
        title: "AgenticOmni",
        description: "Multi-modal document intelligence platform combining OCR, LLM processing, and agentic AI for enterprise document workflows.",
      },
      proposalEngine: {
        title: "Agentic Proposal Engine",
        description: "AI-powered proposal automation agent with job scraping, requirement analysis, and personalized proposal drafting.",
      },
      langGraphAccounting: {
        title: "Agentic LangGraph Accounting",
        description: "Intelligent accounting system powered by LangGraph for automated financial workflows and multi-agent orchestration.",
      },
      siteRagChatbot: {
        title: "Site RAG Chatbot",
        description: "RAG-powered chatbot for static websites with content ingestion from sitemaps and documents.",
      },
      bestItConsultants: {
        title: "BestIT Consultants",
        description: "Corporate website showcasing AI/ML solutions and enterprise digital transformation services.",
      },
      faceSwap: {
        title: "Face Swap SaaS",
        description: "Production-ready AI face-swapping platform with multi-format support and multiple payment gateways.",
      },
    },
    skills: {
      title: "Technical Expertise",
      subtitle: "20+ years of experience across full-stack development, AI/ML, and cloud architecture",
      frontend: "Frontend",
      backend: "Backend",
      aiAutomation: "AI & Automation",
      databases: "Databases",
      cloudDevops: "Cloud & DevOps",
      dataML: "Data & ML",
    },
    experience: {
      title: "Professional Experience",
      subtitle: "Building enterprise solutions across startups and Fortune 500 companies",
      current: {
        title: "Full-Stack & AI Engineer",
        company: "Best IT Consulting Inc.",
        period: "Oct 2024 - Present",
        highlight1: "Founded and scaled consulting firm",
        highlight2: "AI-driven digital solutions",
        highlight3: "Node.js, FastAPI, RAG",
      },
      xperi: {
        title: "Senior Full-stack Engineer",
        company: "Xperi",
        period: "Mar 2021 - Sep 2024",
        highlight1: "ML Data Pipelines",
        highlight2: "Microservices architecture",
        highlight3: "Kubernetes deployment",
      },
      epam: {
        title: "React/Full-stack Engineer, Software Architect",
        company: "EPAM",
        period: "Dec 2018 - Feb 2020",
        highlight1: "Credit Suisse integration",
        highlight2: "Real-time data pipelines",
        highlight3: "Team mentorship",
      },
    },
    documents: {
      title: "Professional Documents",
      subtitle: "Download my resume and cover letter",
      resume: "Resume",
      downloadResume: "Download Resume",
      coverLetter: "Cover Letter",
      downloadCoverLetter: "Download Cover Letter",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's build something amazing together",
      emailMe: "Email Me",
      phone: "236.992.3846",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    footer: {
      copyright: "© 2026 William Jiang. Senior Full-Stack & AI Engineer. Built with Next.js, React, and Tailwind CSS.",
      companyLink: "Best IT Consulting",
    },
  },
  zh: {
    nav: {
      projects: "项目",
      skills: "技能",
      experience: "经历",
      documents: "文档",
      contact: "联系",
    },
    hero: {
      greeting: "您好，我是",
      name: "William姜 (William Jiang)",
      title1: "全栈工程师",
      title2: "AI/ML架构师",
      title3: "RAG系统专家",
      title4: "企业解决方案",
      description: "20多年在初创公司和世界500强企业构建智能系统的经验。专注于智能代理AI、RAG管道和企业数字化转型。",
      viewWork: "查看作品",
      github: "GitHub",
      linkedin: "领英",
      yearsLabel: "年工作经验",
      projectsLabel: "已交付项目",
      systemsLabel: "已构建AI系统",
    },
    projects: {
      title: "精选项目",
      subtitle: "前沿AI与全栈解决方案",
      agenticAP: {
        title: "智能应付账款系统",
        description: "AI原生财务自动化平台，专注于使用RAG和代理工作流处理异构发票格式。",
      },
      agenticOmni: {
        title: "智能全能文档平台",
        description: "结合OCR、LLM处理和代理AI的多模态文档智能平台，用于企业文档工作流。",
      },
      proposalEngine: {
        title: "智能提案引擎",
        description: "AI驱动的提案自动化代理，具有职位抓取、需求分析和个性化提案起草功能。",
      },
      langGraphAccounting: {
        title: "LangGraph智能会计系统",
        description: "由LangGraph驱动的智能会计系统，用于自动化财务工作流和多代理编排。",
      },
      siteRagChatbot: {
        title: "网站RAG聊天机器人",
        description: "为静态网站提供的RAG驱动聊天机器人，支持从网站地图和文档中提取内容。",
      },
      bestItConsultants: {
        title: "BestIT咨询公司",
        description: "展示AI/ML解决方案和企业数字化转型服务的公司网站。",
      },
      faceSwap: {
        title: "换脸SaaS平台",
        description: "生产就绪的AI换脸平台，支持多种格式和多个支付网关。",
      },
    },
    skills: {
      title: "技术专长",
      subtitle: "20多年全栈开发、AI/ML和云架构经验",
      frontend: "前端",
      backend: "后端",
      aiAutomation: "AI与自动化",
      databases: "数据库",
      cloudDevops: "云与运维",
      dataML: "数据与机器学习",
    },
    experience: {
      title: "职业经历",
      subtitle: "在初创企业和世界500强公司构建企业级解决方案",
      current: {
        title: "全栈 & AI 工程师",
        company: "Best IT Consulting Inc.",
        period: "2024年10月 - 至今",
        highlight1: "创立并扩展咨询公司",
        highlight2: "AI驱动的数字解决方案",
        highlight3: "Node.js, FastAPI, RAG",
      },
      xperi: {
        title: "高级全栈工程师",
        company: "Xperi",
        period: "2021年3月 - 2024年9月",
        highlight1: "机器学习数据管道",
        highlight2: "微服务架构",
        highlight3: "Kubernetes部署",
      },
      epam: {
        title: "React/全栈工程师，软件架构师",
        company: "EPAM",
        period: "2018年12月 - 2020年2月",
        highlight1: "瑞信集成",
        highlight2: "实时数据管道",
        highlight3: "团队指导",
      },
    },
    documents: {
      title: "专业文档",
      subtitle: "下载我的简历和求职信",
      resume: "简历",
      downloadResume: "下载简历",
      coverLetter: "求职信",
      downloadCoverLetter: "下载求职信",
    },
    contact: {
      title: "联系我",
      subtitle: "让我们一起创造非凡",
      emailMe: "发邮件",
      phone: "236.992.3846",
      linkedin: "领英",
      github: "GitHub",
    },
    footer: {
      copyright: "© 2026 William姜 (William Jiang). 高级全栈 & AI 工程师. 使用 Next.js、React 和 Tailwind CSS 构建。",
      companyLink: "Best IT Consulting",
    },
  },
};

export function useTranslations(language: Language): Translations {
  return translations[language];
}
