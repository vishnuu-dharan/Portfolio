export const personalInfo = {
  name: "VISHNU DHARAN",
  fullName: "Vishnu Dharan K",
  tag: "// AI & DATA SCIENCE ENGINEER // SYSTEMS ARCHITECT",
  title: "Engineering Intelligence Into",
  typedPhrases: [
    "Software Architecture.",
    "Autonomous AI Agents.",
    "Agentic Workflows.",
    "Full-Stack AI Apps."
  ],
  bio: "Specializing in autonomous multi-agent recruitment architectures, multimodal RAG retrieval systems, voice AI evaluation engines, and production-grade full-stack LLM orchestration pipelines.",
  email: "vishnudharan.ad@gmail.com",
  phone: "+91 63847 95240",
  github: "https://github.com/vishnuu-dharan",
  githubUsername: "github.com/vishnuu-dharan",
  linkedin: "https://www.linkedin.com/in/vishnu-dharan-k-95678229a/",
  linkedinName: "VISHNU DHARAN K",
  resumeUrl: "/resume.pdf"
};

export const aboutData = {
  tag: "01 // ARCHITECTURE & PHILOSOPHY",
  title: "Building Scalable Systems That Think",
  highlight: "Systems That Think",
  description: "I am a B.Tech student specializing in Artificial Intelligence and Data Science at Bannari Amman Institute of Technology. My passion lies at the intersection of production software engineering and cutting-edge AI systems—transforming complex neural models, vector search engines, and multi-agent workflows into reliable, high-performance applications.",
  stats: [
    { count: 5, suffix: "+", label: "AI Projects" },
    { count: 2, suffix: "+", label: "Years Building" },
    { count: 12, suffix: "+", label: "Technologies" },
    { count: 100, suffix: "%", label: "Passion Driven" }
  ],
  focusNodes: [
    {
      title: "LLM & Autonomous Agents",
      desc: "Designing multi-agent orchestration pipelines using LangGraph and LangChain for real-time candidate screening and interview evaluation.",
      icon: "layers"
    },
    {
      title: "Multimodal RAG & Vector Search",
      desc: "Engineering hybrid FAISS + BM25 retrieval engines, CLIP visual embeddings, query expansion, and cross-encoder reranking models.",
      icon: "search"
    },
    {
      title: "Voice AI & Real-Time Speech",
      desc: "Building low-latency voice assistants combining Faster-Whisper, Edge-TTS, and Gemini for automated interactive viva examinations.",
      icon: "mic"
    },
    {
      title: "Full-Stack Integration",
      desc: "Architecting robust microservice backends with FastAPI, Flask, SQL/Vector databases, and responsive React frontend interfaces.",
      icon: "cpu"
    }
  ]
};

export const skillsData = [
  {
    category: "AI & Generative AI Ecosystem",
    skills: [
      { name: "Prompt Engineering", icon: "target" },
      { name: "RAG Systems", icon: "box" },
      { name: "Voice AI", icon: "mic" },
      { name: "LLM Orchestration", icon: "network" },
      { name: "Multi-Agent Systems", icon: "share-2" },
      { name: "Vector Search", icon: "search" }
    ]
  },
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: "code" },
      { name: "Java", icon: "coffee" },
      { name: "SQL", icon: "database" },
      { name: "HTML5 / CSS3", icon: "layout" }
    ]
  },
  {
    category: "Backend & Orchestration",
    skills: [
      { name: "FastAPI", icon: "zap" },
      { name: "Flask", icon: "flask" },
      { name: "LangChain", icon: "link" },
      { name: "LangGraph", icon: "git-fork" },
      { name: "RESTful APIs", icon: "server" },
      { name: "SQLAlchemy", icon: "database" }
    ]
  },
  {
    category: "Frontend & UI Architecture",
    skills: [
      { name: "React.js", icon: "atom" },
      { name: "Tailwind CSS", icon: "wind" },
      { name: "Vite", icon: "zap" },
      { name: "React Router", icon: "git-branch" }
    ]
  },
  {
    category: "Databases & Vector Engines",
    skills: [
      { name: "ChromaDB", icon: "layers" },
      { name: "FAISS", icon: "search" },
      { name: "MongoDB", icon: "leaf" },
      { name: "MySQL", icon: "database" },
      { name: "SQLite", icon: "hard-drive" },
      { name: "PostgreSQL", icon: "shield" }
    ]
  }
];

export const projectsData = [
  {
    id: "voice-ai",
    num: "01 / Voice AI & Speech Analytics",
    badge: "VOICE AI ASSISTANT",
    title: "AI-Powered Interactive Voice Lab Assistant",
    subtitle: "VOICE AI & SPEECH ANALYTICS // GEMINI & FASTER-WHISPER",
    image: "/assets/images/voice_ai.jpg",
    desc: "Intelligent autonomous voice-enabled platform transforming lab sessions and viva evaluations. Features real-time speech interaction, dynamic AI-generated viva questions, automated scoring, and student performance analytics.",
    tech: ["FastAPI", "Gemini 2.5 Flash", "Faster-Whisper", "Edge-TTS", "React 19", "SQLAlchemy"],
    github: "https://github.com/vishnuu-dharan/VoiceAI",
    problem: "Traditional lab viva evaluations require high manual effort, suffer from subjective scoring inconsistencies, and lack automated real-time speech analytics.",
    solution: "Engineered an autonomous voice platform using Faster-Whisper for low-latency Speech-to-Text, Gemini 2.5 Flash for dynamic question generation, Edge-TTS for audio synthesis, and JWT authenticated React 19 dashboards.",
    highlights: [
      "Real-Time Speech Pipeline: Sub-second audio transcription & evaluation.",
      "Dynamic Viva Generation: Contextual AI questions generated on-the-fly.",
      "Educator Dashboard: Comprehensive scoring metrics, student logs, and performance trends."
    ]
  },
  {
    id: "agenthire",
    num: "02 / AgentHire Intelligence",
    badge: "MULTI-AGENT PLATFORM",
    title: "Multi-Agent AI Recruitment & Talent Intelligence Platform",
    subtitle: "AUTONOMOUS MULTI-AGENT ARCHITECTURE // LANGGRAPH & CHROMADB",
    image: "/assets/images/agenthire.jpg",
    desc: "Autonomous multi-agent system streamlining end-to-end talent acquisition — from resume parsing and semantic vector search, to real-time AI interviews, predictive scoring, and data-driven hiring recommendations using LangGraph and ChromaDB.",
    tech: ["FastAPI", "LangGraph", "LangChain", "ChromaDB", "React + Vite", "SpaCy"],
    github: "https://github.com/vishnuu-dharan/AgentHire",
    problem: "Recruitment teams spend hundreds of hours manually screening resumes, scheduling candidate interviews, and writing evaluation notes.",
    solution: "Built an autonomous multi-agent recruitment system powered by LangGraph, ChromaDB vector store, PyMuPDF resume parser, and React + Vite UI. Agents handle parsing, semantic matching, live interviewing, and predictive scoring.",
    highlights: [
      "LangGraph Orchestration: Multi-state autonomous agent workflows.",
      "Vector Semantic Search: High-precision ChromaDB candidate retrieval.",
      "Automated Interviews: Real-time AI interview evaluations with instant report generation."
    ]
  },
  {
    id: "jewellery-rag",
    num: "03 / Multimodal RAG Pipeline",
    badge: "MULTIMODAL RAG",
    title: "Jewellery Multimodal AI Retrieval System",
    subtitle: "MULTIMODAL RAG PIPELINE // FAISS + CLIP + BM25",
    image: "/assets/images/jewellery_rag.jpg",
    desc: "Full-stack multimodal retrieval system for jewellery discovery. Supports text search with LLM based query rewriting, CLIP image search, handwritten OCR pipeline, hybrid FAISS + BM25 retrieval, and cross-encoder reranking.",
    tech: ["FastAPI", "FAISS", "CLIP", "BM25", "React + Vite", "OpenCV"],
    github: "https://github.com/vishnuu-dharan/Jewellery_Multimodal_RAG",
    problem: "Traditional text search fails when customers search for visually intricate jewellery using imprecise natural language queries or handwritten tags.",
    solution: "Architected a multimodal retrieval system combining CLIP image embeddings, LLM query rewriting, handwritten OCR extraction, hybrid FAISS vector search + BM25 lexical search, and cross-encoder reranking over 490 inventory items.",
    highlights: [
      "CLIP Multimodal Embeddings: Search jewellery via visual similarity or natural text.",
      "Hybrid Retrieval: Merges dense vector representations with sparse BM25 scores.",
      "OCR & Reranking: Processes handwritten tag images and ranks candidates with precision."
    ]
  }
];

export const experienceData = [
  {
    date: "2022 — PRESENT",
    role: "B.Tech in Artificial Intelligence & Data Science",
    org: "Bannari Amman Institute of Technology",
    details: "Specializing in AI system design, machine learning algorithms, database management systems, and web architecture. Actively engineering multi-agent recruitment tools, voice AI systems, and multimodal retrieval search engines."
  },
  {
    date: "2023 — PRESENT",
    role: "AI Systems & Full-Stack Developer",
    org: "Independent Engineering Projects",
    details: "Designed and developed production-ready AI applications including VoiceAI Lab Assistant, AgentHire autonomous recruitment system, and Jewellery Multimodal RAG pipeline combining vector search, Speech-to-Text, and LLM orchestration."
  }
];
