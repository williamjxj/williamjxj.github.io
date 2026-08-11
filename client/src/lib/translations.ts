import { Language } from "@/contexts/LanguageContext";

export interface Translations {
  nav: {
    about: string;
    stack: string;
    projects: string;
    experience: string;
    documents: string;
    contact: string;
  };
  hero: {
    available: string;
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
    scrollHint: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio1: string;
    bio2: string;
    building: string;
    company: string;
    base: string;
    languages: string;
    motto: string;
    founder: string;
  };
  stack: {
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    aiAutomation: string;
    databases: string;
    cloudDevops: string;
    dataML: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
    autobidder: { title: string; description: string };
    manusShop: { title: string; description: string };
    faceSwap: { title: string; description: string };
    bidmaster: { title: string; description: string };
    uploadImage: { title: string; description: string };
    jqueryPs: { title: string; description: string };
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
    overviewTitle: string;
    overviewDesc: string;
    detailsTitle: string;
    detailsDesc: string;
    animationTitle: string;
    animationDesc: string;
    download: string;
    open: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailMe: string;
    phone: string;
    linkedin: string;
    github: string;
    company: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    builtWith: string;
    companyLink: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      stack: "Stack",
      projects: "Projects",
      experience: "Experience",
      documents: "Documents",
      contact: "Contact",
    },
    hero: {
      available: "Open to AI & Web Projects",
      greeting: "Hi, I'm",
      name: "William Jiang",
      title1: "Full-Stack Engineer",
      title2: "AI Consultant",
      title3: "AI SaaS Builder",
      title4: "Agent & Automation Specialist",
      description:
        "I design and ship production-grade AI agents, SaaS products, and web platforms — from architecture and backend to UI and deployment.",
      viewWork: "View My Work",
      github: "GitHub",
      linkedin: "LinkedIn",
      yearsLabel: "Years Experience",
      projectsLabel: "Projects Delivered",
      systemsLabel: "AI Systems Built",
      scrollHint: "Scroll to explore",
    },
    about: {
      title: "About Me",
      subtitle: "Engineer · Consultant · Founder",
      bio1:
        "I'm a Senior Full-Stack Engineer & AI Consultant based in Surrey, BC 🇨🇦. Through Best IT Consulting, I help BC businesses ship web platforms, AI integrations, and digital marketing systems — and I design, build, and launch my own AI-powered SaaS products end to end.",
      bio2:
        "My work spans the entire stack: architecture, backend, UI, and deployment — with a special focus on AI agents, RAG pipelines, and production-grade automation.",
      building: "AI agents · SaaS · Web platforms",
      company: "Best IT Consulting",
      base: "Surrey, BC, Canada 🇨🇦",
      languages: "English · 简体中文",
      motto: "Ship production-grade software, not proof-of-concepts.",
      founder: "Founder, Best IT Consulting Inc.",
    },
    stack: {
      title: "Technical Expertise",
      subtitle: "20+ years across full-stack development, AI/ML, and cloud architecture",
      frontend: "Frontend",
      backend: "Backend",
      aiAutomation: "AI & Automation",
      databases: "Databases",
      cloudDevops: "Cloud & DevOps",
      dataML: "Data & ML",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "AI-powered products and full-stack platforms I've built and shipped",
      viewAll: "View all repositories on GitHub →",
      autobidder: {
        title: "AutoBidder AI",
        description:
          "AI-powered proposal automation agent — job scraping, requirement analysis, and personalized proposal drafting, end to end.",
      },
      manusShop: {
        title: "manus-ai-shop",
        description:
          "Full-stack AI e-commerce build with Next.js, Tailwind, Stripe, Supabase, and Vercel.",
      },
      faceSwap: {
        title: "Face Swap SaaS",
        description:
          "Production-ready AI face-swap platform — Next.js 15, React 19, Supabase. Video, image & GIF, multi-payment.",
      },
      bidmaster: {
        title: "BidMaster",
        description:
          "Centralized platform to discover, track, and manage freelance opportunities across multiple sources.",
      },
      uploadImage: {
        title: "upload-image",
        description:
          "A simple Node.js tool to upload local images to the web in seconds.",
      },
      jqueryPs: {
        title: "jQuery Photoshop UI",
        description:
          "jQuery-driven UI toolkit that works with Photoshop PSD and PNG workflows.",
      },
    },
    experience: {
      title: "Professional Experience",
      subtitle: "Building enterprise solutions across startups and Fortune 500 companies",
      current: {
        title: "Full-Stack & AI Engineer",
        company: "Best IT Consulting Inc.",
        period: "Oct 2024 — Present",
        highlight1: "Founded and scaled a consulting firm",
        highlight2: "AI-driven digital solutions for BC businesses",
        highlight3: "Node.js, FastAPI, RAG",
      },
      xperi: {
        title: "Senior Full-stack Engineer",
        company: "Xperi",
        period: "Mar 2021 — Sep 2025",
        highlight1: "ML data pipelines",
        highlight2: "Microservices architecture",
        highlight3: "Kubernetes deployment",
      },
      epam: {
        title: "React/Full-stack Engineer, Software Architect",
        company: "EPAM",
        period: "Dec 2018 — Feb 2020",
        highlight1: "Credit Suisse integration",
        highlight2: "Real-time data pipelines",
        highlight3: "Team mentorship",
      },
    },
    documents: {
      title: "Professional Documents",
      subtitle: "Resume, cover letter & technical documents",
      overviewTitle: "AutoDrive ML Training Overview",
      overviewDesc:
        "Comprehensive overview of machine learning training workflows for autonomous driving systems.",
      detailsTitle: "AutoDrive ML Training Details",
      detailsDesc:
        "Detailed technical specifications and implementation guidelines for ML training pipelines.",
      animationTitle: "Frontend Animation Reference",
      animationDesc:
        "A standalone interactive reference page for frontend animation techniques.",
      download: "Download Document",
      open: "Open Reference Page",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's build something amazing together",
      emailMe: "Email Me",
      phone: "236.992.3846",
      linkedin: "LinkedIn",
      github: "GitHub",
      company: "Best IT Consulting",
    },
    footer: {
      tagline: "Senior Full-Stack Engineer & AI Consultant",
      copyright: "© 2026 William Jiang. All rights reserved.",
      builtWith: "Built with React, TypeScript & Tailwind CSS",
      companyLink: "Best IT Consulting",
    },
  },
  zh: {
    nav: {
      about: "关于",
      stack: "技术栈",
      projects: "项目",
      experience: "经历",
      documents: "文档",
      contact: "联系",
    },
    hero: {
      available: "接受 AI 与 Web 项目合作",
      greeting: "您好，我是",
      name: "William Jiang",
      title1: "全栈工程师",
      title2: "AI 顾问",
      title3: "AI SaaS 开发者",
      title4: "智能体与自动化专家",
      description:
        "从架构、后端、UI 到部署，我全栈设计并交付生产级 AI 智能体、SaaS 产品与 Web 平台。",
      viewWork: "查看作品",
      github: "GitHub",
      linkedin: "领英",
      yearsLabel: "年工作经验",
      projectsLabel: "已交付项目",
      systemsLabel: "已构建 AI 系统",
      scrollHint: "向下滚动探索",
    },
    about: {
      title: "关于我",
      subtitle: "工程师 · 顾问 · 创始人",
      bio1:
        "我是常驻加拿大不列颠哥伦比亚省萨里市的资深全栈工程师与 AI 顾问 🇨🇦。通过 Best IT Consulting，我帮助本地企业交付 Web 平台、AI 集成与数字营销系统，同时独立设计、构建并发布 AI 驱动的 SaaS 产品。",
      bio2:
        "我的工作覆盖整个技术栈：架构、后端、UI 与部署，尤其专注于 AI 智能体、RAG 管道与生产级自动化。",
      building: "AI 智能体 · SaaS · Web 平台",
      company: "Best IT Consulting",
      base: "加拿大 BC 省萨里市 🇨🇦",
      languages: "英语 · 简体中文",
      motto: "交付生产级软件，而非概念验证。",
      founder: "创始人，Best IT Consulting Inc.",
    },
    stack: {
      title: "技术专长",
      subtitle: "20 多年全栈开发、AI/ML 与云架构经验",
      frontend: "前端",
      backend: "后端",
      aiAutomation: "AI 与自动化",
      databases: "数据库",
      cloudDevops: "云与运维",
      dataML: "数据与机器学习",
    },
    projects: {
      title: "精选项目",
      subtitle: "我构建并交付的 AI 产品与全栈平台",
      viewAll: "在 GitHub 上查看全部仓库 →",
      autobidder: {
        title: "AutoBidder AI",
        description:
          "AI 驱动的提案自动化智能体——职位抓取、需求分析、个性化提案起草，全流程自动化。",
      },
      manusShop: {
        title: "manus-ai-shop",
        description:
          "基于 Next.js、Tailwind、Stripe、Supabase 与 Vercel 的全栈 AI 电商项目。",
      },
      faceSwap: {
        title: "换脸 SaaS 平台",
        description:
          "生产就绪的 AI 换脸平台——Next.js 15、React 19、Supabase，支持视频、图片、GIF 与多种支付方式。",
      },
      bidmaster: {
        title: "BidMaster",
        description:
          "集中式平台，用于跨多个来源发现、跟踪和管理自由职业机会。",
      },
      uploadImage: {
        title: "upload-image",
        description:
          "一个简单的 Node.js 工具，可在数秒内将本地图片上传到网络。",
      },
      jqueryPs: {
        title: "jQuery Photoshop UI",
        description:
          "基于 jQuery 的 UI 工具包，适用于 Photoshop PSD 与 PNG 工作流。",
      },
    },
    experience: {
      title: "职业经历",
      subtitle: "在初创企业与世界 500 强公司构建企业级解决方案",
      current: {
        title: "全栈 & AI 工程师",
        company: "Best IT Consulting Inc.",
        period: "2024 年 10 月 — 至今",
        highlight1: "创立并扩展咨询公司",
        highlight2: "为 BC 省企业提供 AI 驱动的数字解决方案",
        highlight3: "Node.js, FastAPI, RAG",
      },
      xperi: {
        title: "高级全栈工程师",
        company: "Xperi",
        period: "2021 年 3 月 — 2025 年 9 月",
        highlight1: "机器学习数据管道",
        highlight2: "微服务架构",
        highlight3: "Kubernetes 部署",
      },
      epam: {
        title: "React/全栈工程师，软件架构师",
        company: "EPAM",
        period: "2018 年 12 月 — 2020 年 2 月",
        highlight1: "瑞信集成",
        highlight2: "实时数据管道",
        highlight3: "团队指导",
      },
    },
    documents: {
      title: "专业文档",
      subtitle: "简历、求职信与技术文档",
      overviewTitle: "AutoDrive 机器学习训练概览",
      overviewDesc:
        "自动驾驶系统机器学习训练工作流的全面概览。",
      detailsTitle: "AutoDrive 机器学习训练细节",
      detailsDesc:
        "机器学习训练管道的详细技术规格与实施指南。",
      animationTitle: "前端动画参考",
      animationDesc:
        "独立交互式前端动画技术参考页面。",
      download: "下载文档",
      open: "打开参考页面",
    },
    contact: {
      title: "联系我",
      subtitle: "让我们一起创造非凡",
      emailMe: "发邮件",
      phone: "236.992.3846",
      linkedin: "领英",
      github: "GitHub",
      company: "Best IT Consulting",
    },
    footer: {
      tagline: "资深全栈工程师 & AI 顾问",
      copyright: "© 2026 William Jiang. 保留所有权利。",
      builtWith: "使用 React、TypeScript 与 Tailwind CSS 构建",
      companyLink: "Best IT Consulting",
    },
  },
};

export function useTranslations(language: Language): Translations {
  return translations[language];
}
