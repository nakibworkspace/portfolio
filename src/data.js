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
    headline: "Bridging the gap between MLOps Engineering and Autonomous Research.",
  
    // Small green label above your name on Home
    tagline: "Data/MLOps Engineer · PhD Aspirant",
  
    role: "Junior Software Engineer",
    company: "Poridhi.io",
    roleFocus: "MLOps & Data Pipeline Development",
    location: "Chittagong, Bangladesh",
  
    // ← REPLACE with your real email
    email: "your-email@example.com",
  
    // ← REPLACE with your real profile URLs
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
  
    // Path to your CV file. Put your PDF in the "public" folder
    // and make sure the filename matches (e.g., "public/resume.pdf")
    cvLink: "/resume.pdf",
  };
  
  
  // ─── WORK EXPERIENCE ───────────────────────────────────────
  // Each object = one job. To add a new job, copy one object
  // and paste it below, then fill in the details.
  export const experience = [
    {
      title: "Junior Software Engineer",
      company: "Poridhi.io",
      period: "2024 — Present",         // ← Update your start/end dates
      focus: "MLOps & Data Focus",       // Optional subtitle
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
    "Infrastructure": ["AWS (EC2, S3, SageMaker)", "Docker", "Pulumi (IaC)", "Terraform"],
    "ML Monitoring": ["Evidently AI", "MLflow Tracking", "Custom Metrics", "Prometheus"],
    "Backend & APIs": ["FastAPI", "PostgreSQL", "REST APIs", "GraphQL"],
  };
  // ← To add a new category, just add a new key-value pair.
  // ← To change icons per category, see Skills.jsx (there's a map at the top).
  
  
  // ─── EDUCATION ─────────────────────────────────────────────
  export const education = [
    {
      degree: "BSc in Mechatronics & Industrial Engineering",
      institution: "Chittagong University of Engineering and Technology (CUET)",
      period: "2020 — 2024",           // ← Update dates
      cgpa: "3.29 / 4.00",
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
      title: "RAG-based Knowledge Retrieval System",
      description: "End-to-end Retrieval-Augmented Generation pipeline with vector embeddings, semantic search, and LLM-powered answer synthesis. Full observability with Langfuse.",
      tags: ["RAG", "LangChain", "FastAPI", "Langfuse", "Vector DB"],
      github: "https://github.com/yourusername/rag-system",     // ← REPLACE
      demo: null,  // ← Add URL like "https://your-demo.vercel.app" if available
    },
    {
      title: "Customer Churn Prediction Pipeline",
      description: "Full ML pipeline from data ingestion to model serving. Includes feature engineering, experiment tracking with MLflow, and data drift monitoring with Evidently AI.",
      tags: ["MLflow", "Evidently", "Scikit-learn", "FastAPI", "Docker"],
      github: "https://github.com/yourusername/churn-prediction", // ← REPLACE
      demo: null,
    },
    {
      title: "Real-time Fraud Detection with Kafka & Flink",
      description: "Streaming data pipeline for real-time fraud scoring using Apache Kafka for event ingestion and Apache Flink for windowed computation and anomaly detection.",
      tags: ["Kafka", "Flink", "Python", "Docker", "AWS"],
      github: "https://github.com/yourusername/fraud-detection",  // ← REPLACE
      demo: null,
    },
    // ← ADD MORE PROJECTS HERE. Copy any object above and change the values.
  ];
  
  
  // ─── NAVIGATION TABS ───────────────────────────────────────
  // Controls the tab buttons in the navbar.
  // The "id" must match a key in the `sections` object in App.jsx.
  // To add a new section: add a tab here, add a key in App.jsx,
  // and create the component file in src/components/.
  export const navTabs = [
    { id: "home",       label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "research",   label: "Research" },
    { id: "skills",     label: "Skills" },
    { id: "education",  label: "Education" },
    { id: "projects",   label: "Projects" },
  ];