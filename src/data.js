// ============================================================
// data.js — EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
//
// HOW THIS WORKS:
//   Every component (Home, Experience, Skills, etc.) imports
//   its data from THIS file. You never touch the component
//   code unless you want to change the visual layout.
//
//   To update your info, just change the text/links below.
//   The website will automatically reflect your changes.
// ============================================================


// ─── PERSONAL INFORMATION ──────────────────────────────────
// Change these strings to update your name, headline, links, etc.
export const personalInfo = {
    name: "Nakib Ahmed Raj",
  
    // This is the big text shown on the Home section
    // headline: "Bridging the gap between MLOps Engineering and Autonomous Research.",
  
    // Small green label above your name on Home
    tagline: "ML/DataOps Engineer · PhD Aspirant",
  
    role: "Junior Software Engineer",
    company: "Poridhi.io",
    roleFocus: "MLOps & Data Pipeline Development and AI Engineering",
    location: "Dhaka, Bangladesh",
  
    // ← REPLACE with your real email
    email: "rajnakib2003@gmail.com",
  
    // ← REPLACE with your real profile URLs
    linkedin: "https://www.linkedin.com/in/nakibahmedraj/",
    github: "https://github.com/nakibworkspace",
  
    // Path to your CV file. Files in `public/` are served at the
    // site root, so just use the filename.
    cvLink: "/Nakib Ahmed Raj- CV.pdf",
  };


  // ─── HOME OVERVIEW ────────────────────────────────────────
  // Plain-text "about me" blurb shown on the Home page, just above
  // the knowledge base graph. Keep it conversational and short.
  // The array lets you split it into multiple paragraphs if you
  // want; each entry renders as its own <p>.
  export const overview = [
    "Data/MLOps engineer. I build production ML pipelines, monitoring, and the streaming infra behind them.",
    "Currently exploring VLMs for robot navigation. Looking to start a PhD.",
  ];
  
  
  // ─── WORK EXPERIENCE ───────────────────────────────────────
  // Each object = one job. To add a new job, copy one object
  // and paste it below, then fill in the details.
  export const experience = [
    {
      title: "Junior Software Engineer",
      company: "Poridhi.io",
      period: "2024 — Present",         // ← Update your start/end dates
      focus: "Data Engineering, MLOps and LLMOps",       // Optional subtitle
      // Each string below = one bullet point on the timeline
      points: [
        "Designed and deployed end-to-end Churn Detection & Fraud Detection ML pipelines with reproducible experiment tracking via MLflow.",
        "Integrated MLOps observability stack — Evidently AI for data & concept drift monitoring, Langfuse for LLM pipeline tracing.",
        "Built real-time data streaming architecture using Apache Kafka for event ingestion and Apache Flink for windowed stream processing.",
        "Containerized ML microservices with Docker and orchestrated cloud deployments on AWS using Pulumi (Infrastructure as Code).",
      ],
    },
    // ← ADD MORE JOBS HERE. Example:
    // {
    //   title: "Your Previous Role",
    //   company: "Company Name",
    //   period: "2022 — 2024",
    //   focus: "",
    //   points: [
    //     "What you did...",
    //     "Another achievement...",
    //   ],
    // },
  ];
  
  
  // ─── RESEARCH & THESIS ─────────────────────────────────────
  // Each object = one research item (thesis, ongoing project, paper)
  export const research = [
    {
      // This label appears as a badge (e.g., "Current Research", "Undergraduate Thesis")
      type: "Current Research",
      title: "Vision-Language Models for Autonomous Robot Navigation",
      // Shown as a small status pill (e.g., "Ongoing", "Completed", "Under Review")
      status: "Ongoing",
      description: "Exploring how Vision-Language Models (VLMs) can enable robots to understand and navigate complex environments by bridging visual perception with natural language spatial reasoning.",
      // Tags shown as small chips below the description
      tags: ["VLMs", "Robot Navigation", "Spatial Reasoning", "Multimodal Learning"],
    },
    {
      type: "Undergraduate Thesis",
      title: "Online Harassment Detection using Neural NLP Approaches",
      status: "Completed",
      description: "Applied transformer-based neural architectures for classifying toxic and harassing content in Bengali and English online discourse, achieving strong performance on benchmark datasets.",
      tags: ["NLP", "Transformers", "Toxic Content Detection", "Bengali NLP"],
    },
    // ← ADD MORE RESEARCH HERE (publications, preprints, etc.)
  ];
  
  
  // ─── TECHNICAL SKILLS ──────────────────────────────────────
  // Each key = a category name (shown as a card heading)
  // Each value = array of skill names (shown as chips)
  export const skills = {
    "Orchestration": ["Apache Airflow", "MLflow", "Langfuse", "Prefect"],
    "Data Engineering": ["Apache Spark", "Apache Kafka", "Apache Flink", "SQL"],
    "Infrastructure": ["AWS (EC2, S3, EKS, ECS)", "Docker", "Kubernetes", "Pulumi (IaC)"],
    "ML Monitoring": ["Evidently AI", "MLflow Tracking", "Custom Metrics", "Prometheus"],
    "Backend & APIs": ["FastAPI", "PostgreSQL", "REST APIs"],
    "Agentic Workflows": ["LangChain", "LangGraph", "Langfuse", "W&B"]
  };
  // ← To add a new category, just add a new key-value pair.
  // ← To change icons per category, see Skills.jsx (there's a map at the top).


  // ─── DERIVED: SKILLS GRAPH DATA ─────────────────────────────
  // 3-level hierarchy for the home knowledge base:
  //   Root ("Skills") → category → individual skill
  // Rendered as a force-directed graph with the root at center,
  // categories on an inner ring, skills on an outer ring.
  // NOTE: declared AFTER `skills` so we can safely reference it.
  export const skillsGraph = (() => {
    const nodes = [{ id: 'root:Skills', label: 'Skills', kind: 'root' }];
    const links = [];
    for (const [category, items] of Object.entries(skills)) {
      const catId = `cat:${category}`;
      nodes.push({ id: catId, label: category, kind: 'category' });
      links.push({ source: 'root:Skills', target: catId });
      for (const skill of items) {
        const skillId = `s:${category}:${skill}`;
        nodes.push({
          id: skillId,
          label: skill,
          kind: 'skill',
          category,
        });
        links.push({ source: catId, target: skillId });
      }
    }
    return { nodes, links };
  })();
  
  
  // ─── EDUCATION ─────────────────────────────────────────────
  export const education = [
    {
      degree: "BSc in Mechatronics & Industrial Engineering",
      institution: "Chittagong University of Engineering and Technology (CUET)",
      period: "2020 — 2024",           // ← Update dates
      cgpa: "3.27 / 4.00",
      // Bullet points for thesis, achievements, etc.
      highlights: [
        "Thesis: Online Harassment Detection using Neural NLP Approaches",
      ],
    },
    // ← ADD MORE DEGREES HERE (e.g., future PhD)
  ];
  
  
  // ─── LEADERSHIP ────────────────────────────────────────────
  export const leadership = [
    {
      role: "Chair — IEEE Computer Society Student Branch",  // ← Update title if needed
      institution: "CUET",
      period: "2023 — 2024",         // ← Update dates
      points: [
        "Led a team of 20+ members organizing technical workshops, hackathons, and seminars on AI/ML and software engineering.",
        "Established industry-academia partnerships for student skill development programs.",
      ],
    },
    // ← ADD MORE LEADERSHIP ROLES HERE
  ];
  
  
  // ─── PROJECTS / GITHUB REPOS ───────────────────────────────
  // Each object = one project card.
  // Set "demo" to a URL if you have a live demo, or keep it null.
  export const projects = [
    {
      title: "Credit Card Approval Prediction",
      description: "Streaming data pipeline for real-time fraud scoring using Apache Kafka for event ingestion and Apache Flink for windowed computation and anomaly detection.",
      tags: ["Kafka", "Flink", "Python", "Docker", "AWS", "Github Action"],
      github: "https://github.com/nakibworkspace/card-approval-prediction-mlops",  // ← REPLACE
      demo: null,
    },
    {
      title: "Serving NLP and CV model using FastAPI on AWS EC2",
      description: "Serving two different services on AWS using FastAPI for a R&D project",
      tags: ["NLP", "CV", "FastAPI", "Docker", "AWS"],
      github: "https://github.com/yourusername/fraud-detection",  // ← REPLACE
      demo: null,
    },
    {
      title: "Learning Minitorch",
      description: "Building a Machine Learning Framework for matrix computation",
      tags: ["Python", "AutoGrad"],
      github: "https://github.com/nakibworkspace/minitorch-fundamentals",
      demo: null,
    },
    {
      title: "Data Lake and Warehouse Management",
      description: "A R&D project for high volume data to store and serve using Data Lake and Warehousing",
      tags: ["Postgres", "AWS S3", "Clickhouse", "dbt", "Prometheus", "Grafana", "Makefile"],
      github: "https://github.com/nakibworkspace/datalake-management/tree/main",  // ← REPLACE
      demo: null,
    },
    {
      title: "Chatbot Observability with Langfuse",
      description: "Integrating Langfuse to a basic chatbot to trace the conversation, token counts, and cost management. Used agentic approach such as Langfuse Skills to debug or any sort of queries done in natural language",
      tags: ["Langfuse", "Langchain"],
      github: "https://github.com/nakibworkspace/chatbot-observability",  // ← REPLACE
      demo: null,
    },
    {
      title: "Fraud Detection Pipeline",
      description: "Full ML pipeline from data ingestion to model serving. Includes feature engineering, experiment tracking with MLflow, and data drift monitoring with Evidently AI.",
      tags: ["MLflow", "Evidently", "Scikit-learn", "FastAPI", "Docker", "Airflow"],
      github: "https://github.com/nakibworkspace/Fraud-detection-pipeline", // ← REPLACE
      demo: null,
    },
    {
    title: "RAG-based Knowledge Retrieval System",
    description: "End-to-end Retrieval-Augmented Generation pipeline with vector embeddings, semantic search, and LLM-powered answer synthesis. Deep dived into advance RAG systems such as chunking strategies, indexing, Retrievals, Agentic RAG, CRAG as well",
    tags: ["RAG", "LangChain", "FastAPI", "Langfuse", "Vector DB"],
    // image: '/projects/rag-system.png',     // ← ADD a 16:9 image at public/projects/ to showcase
    github: "https://github.com/nakibworkspace/rag-labs",     // ← REPLACE
    demo: null,  // ← Add URL like "https://your-demo.vercel.app" if available
    },
    // ← ADD MORE PROJECTS HERE. Copy any object above and change the values.
  ];
  
  
  // ─── NAVIGATION TABS ───────────────────────────────────────
  // Controls the tab buttons in the navbar.
  // The "id" must match a key in the `sections` object in App.jsx.
  // `hidden: true` removes the tab from the navbar but keeps the
  // section reachable programmatically (e.g., from the home graph).
  // To add a new section: add a tab here, add a key in App.jsx,
  // and create the component file in src/components/.
  export const navTabs = [
    { id: "home",       label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "work",       label: "Work" },
    { id: "skills",     label: "Skills", hidden: true },
    { id: "education",  label: "Education" },
    { id: "connect",    label: "Connect" },
  ];