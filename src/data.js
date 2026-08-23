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

    // Big text shown on the Home section, below the name.
    // Tailored for both PhD PIs (research direction) and
    // industry MLOps folks (production scope).
    headline: "MLOps engineer. I build the production plumbing under ML systems: pipelines, observability, streaming.",

    // Small uppercase label above your name on Home
    tagline: "ML/DataOps Engineer · PhD Aspirant",

    role: "Junior Software Engineer",
    company: "Poridhi.io",
    roleFocus: "MLOps & Data Pipeline Development and AI Engineering",
    location: "Dhaka, Bangladesh",

    // Short label for the home meta line. Shown inline with
    // role · degree · location. Should be 2-4 words, no colon.
    researchDirection: "Research: SE4AI",

    // ← REPLACE with your real email
    email: "rajnakib2003@gmail.com",

    // ← REPLACE with your real profile URLs
    linkedin: "https://www.linkedin.com/in/nakibahmedraj/",
    github: "https://github.com/nakibworkspace",

    // Path to your CV file. Files in `public/` are served at the
    // site root, so just use the filename.
    cvLink: "/projects/NakibAhmedRaj_CV.pdf",
  };


  // ─── HOME OVERVIEW ────────────────────────────────────────
  // Plain-text "about me" blurb shown on the Home page, just above
  // the categorized skills list. Keep it conversational and short.
  // The array lets you split it into multiple paragraphs if you
  // want; each entry renders as its own <p>.
  export const overview = [
    "I work at the intersection of agentic systems and production ML. On the systems side: streaming pipelines with self-monitoring, drift detection wired into the same observability surface as model performance, and infrastructure that ships reproducibly through IaC. On the agentic side: workflows where agents write, validate, and execute against real data, not demos.",
    "Research interests span ML, deep learning, and NLP applied to software engineering. Code generation, code review, program repair, and LLM agents for development workflows.",
  ];


  // ─── WORK EXPERIENCE ───────────────────────────────────────
  // Each object = one job.
  //   problem (optional): one-line framing of the context — what
  //     was the gap when you joined? PIs and hiring managers
  //     both respond to this narrative setup.
  //   scope (optional): a small pill rendered next to the role
  //     title. Use this to signal prototype / internal / demo
  //     work without making the bullets defensive.
  //   points: bullets rewritten as action → artifact → outcome.
  //     For prototype-stage work, lean on what you BUILT rather
  //     than throughput numbers.
  export const experience = [
    {
      title: "Junior Software Engineer",
      company: "Poridhi.io",
      period: "Jan 2025 — Present",
      scope: "Prototype & demo builds",
      problem: "Built the MLOps and LLM tooling layer from a blank slate — pipelines, observability, and experimentation surface for client demos.",
      focus: "Data Engineering, MLOps & LLMOps",
      points: [
        "Designed and shipped end-to-end streaming pipeline (Kafka → Flink) for a churn-detection demo, then re-used the template for a fraud-detection build.",
        {
          clientPoc: "Selected client POC · via Poridhi.io (NDA)",
          text: "Built and deployed an embedding-generation POC for a partner organization — S3-triggered AWS Lambda orchestration, EC2-hosted SBERT embedding service (Flask, all-MiniLM-L6-v2), Qdrant vector DB on EC2, all provisioned with Terraform. (Project code, infrastructure, and metrics owned by the partner company.)",
        },
        {
          clientPoc: "Hands-on lab · via Poridhi.io (NDA)",
          text: "Built a multi-cluster Elasticsearch hands-on lab for a partner organization — two clusters (Netflow IPlog and Netflow SysLog) queried via natural-language prompts translated to Elasticsearch DSL. Covered cluster health, mapping introspection, IP/port/time filtering, and aggregations through ~30 guided interactions. (Lab content and target clusters owned by the partner company.)",
        },
        {
          clientPoc: "Internal platform build · via Poridhi.io (NDA)",
          text: "Built a network analytics portal and AI-assisted analysis toolkit for a partner ISP — FastAPI web portal, ~12 analysis workflows spanning bandwidth / threat detection / SLA / compliance, integration with Loki, Grafana, and SNMP telemetry, plus an AI analysis layer for conversational queries against the live data. (Repo, infrastructure, and subscriber data owned by the partner company.)",
        },
        "Integrated Evidently AI for data & concept drift monitoring and Langfuse for LLM-pipeline tracing — both wired into the same demo harness so a reviewer can see the full observability surface in one place.",
        "Standardized experiment tracking via MLflow across the demo projects; configured artifact logging, parameter comparison, and run lineage.",
        "Containerized ML microservices with Docker and stood up the AWS infrastructure (EC2, S3, EKS) through Pulumi IaC so the same stack could be re-deployed for any new client demo.",
      ],
    },
    {
      title: "Data Engineering Intern",
      company: "Poridhi.io",
      period: "Oct 2024 — Dec 2024",
      scope: "Internship",
      problem: "Wanted hands-on context with production-grade data tooling before committing to a full-time MLOps role.",
      focus: "Data Engineering",
      points: [
        "Built batch ETL pipelines with Apache Airflow and Apache Spark against AWS S3, orchestrated via Docker containers.",
        "Wrote PySpark jobs for parquet transformations and columnar aggregations on multi-GB sample datasets; used Polars for in-process exploration where its lazy query engine was a better fit.",
        "Deployed services on AWS EC2 behind a FastAPI layer; documented the setup for repeatability.",
      ],
    },
    // ← ADD MORE JOBS HERE. Copy any object above and change the values.
  ];


  // ─── RESEARCH ────────────────────────────────────────────
  // Each object = one research item (thesis, ongoing project, paper).
  //   links: array of { label, href }. Rendered as "↗ Label"
  //     under the description. Leave empty if nothing to link yet.
  export const research = [
    {
      type: "Side Interest",
      title: "Vision-Language Models for Spatial Reasoning",
      status: "Exploring",
      description: "Reading and occasional prototyping around how Vision-Language Models can ground language in physical or visual spatial tasks — an adjacent interest to my primary SE4AI direction.",
      tags: ["VLMs", "Spatial Reasoning", "Multimodal Learning"],
      links: [
        // { label: "Notes", href: "" },
      ],
    },
    {
      type: "Undergraduate Thesis",
      title: "Online Harassment Detection using Neural NLP Approaches",
      status: "Completed",
      description: "Applied transformer-based neural architectures for classifying toxic and harassing content in Bengali and English online discourse, achieving strong performance on benchmark datasets.",
      tags: ["NLP", "Transformers", "Toxic Content Detection", "Bengali NLP"],
      links: [
        // { label: "Thesis PDF", href: "" },
      ],
    },
    // ← ADD MORE RESEARCH HERE (publications, preprints, etc.)
  ];


  // ─── TECHNICAL SKILLS ──────────────────────────────────────
  // Each key = a category name (shown as a section heading on Home).
  //   mark: 'shipped' | 'research' | 'learning'
  //     shipped = used in production code I've shipped
  //     research = used for research / thesis work
  //     learning = currently exploring, not yet shipped
  //   items: skill names shown as a flowing list under the category.
  export const skills = {
    "Orchestration":       { mark: "shipped",  items: ["Apache Airflow", "MLflow", "Langfuse", "Prefect"] },
    "Data Engineering":    { mark: "shipped",  items: ["Apache Spark", "Apache Kafka", "Apache Flink", "SQL", "dbt", "Clickhouse", "Polars"] },
    "Infrastructure":      { mark: "shipped",  items: ["AWS (EC2, S3, EKS, Lambda)", "Docker", "Kubernetes", "Pulumi (IaC)"] },
    "ML Monitoring":       { mark: "shipped",  items: ["Evidently AI", "MLflow Tracking", "Custom Metrics", "Prometheus", "Grafana", "OpenObserve"] },
    "Observability & Logs":{ mark: "shipped",  items: ["Loki", "Observium (SNMP)", "LogQL", "MinIO (S3)"] },
    "Backend & APIs":      { mark: "shipped",  items: ["FastAPI", "PostgreSQL", "REST APIs"] },
    "Vector & Search":     { mark: "shipped",  items: ["Qdrant", "Elasticsearch", "SBERT (sentence-transformers)", "Vector embeddings"] },
    "Agentic Workflows":   { mark: "shipped",  items: ["LangChain", "LangGraph", "Langfuse", "W&B"] },
    "ML Research":         { mark: "research", items: ["PyTorch", "Hugging Face Transformers", "VLMs (CLIP / BLIP-2)"] },
    "Currently exploring": { mark: "learning", items: ["Harness Engineering", "Efficient Agentic AI usages"] },
  };

  // Map each mark to a palette token used by the Home list.
  // 'shipped' = accent crimson, 'research' = sky-light blue,
  // 'learning' = muted fg grey.
  export const markColor = {
    shipped:  'var(--accent)',
    research: 'var(--sky-light)',
    learning: 'var(--fg-mute)',
  };

  export const markLabel = {
    shipped:  'shipped',
    research: 'research',
    learning: 'learning',
  };


  // ─── EDUCATION ─────────────────────────────────────────────
  export const education = [
    {
      degree: "BSc in Mechatronics & Industrial Engineering",
      institution: "Chittagong University of Engineering and Technology (CUET)",
      period: "2020 — 2024",
      // CGPA intentionally omitted — PhD applications weight
      // coursework and research fit over GPA at this level.
      // Relevant coursework, ordered roughly by depth.
      coursework: [
        "Linear Algebra",
        "Numerical Methods",
        "Optimization",
        "Statistics",
        "Machine Learning",
        "Natural Language Processing",
        "Robotics",
        "Linear Systems",
      ],
      // One-line pointer to where I am heading next — read by
      // PI's during a 30-second portfolio scan.
      currentFocus: "LLM agents for code generation & review · NLP for program repair · ML on logs & developer artifacts · multimodal models for software documentation",
      highlights: [
        "Thesis: Online Harassment Detection using Neural NLP Approaches",
      ],
    },
    // ← ADD MORE DEGREES HERE (e.g., future PhD)
  ];


  // ─── LEADERSHIP ────────────────────────────────────────────
  export const leadership = [
    {
      role: "Chair — IEEE Computer Society Student Branch",
      institution: "CUET",
      period: "2023 — 2024",
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
      github: "https://github.com/nakibworkspace/card-approval-prediction-mlops",
      demo: null,
    },
    {
      title: "Serving NLP and CV model using FastAPI on AWS EC2",
      description: "Serving two different services on AWS using FastAPI for a R&D project",
      tags: ["NLP", "CV", "FastAPI", "Docker", "AWS"],
      github: "https://github.com/nakibworkspace/fastapi-nlp-cv-serving",
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
      github: "https://github.com/nakibworkspace/datalake-management/tree/main",
      demo: null,
    },
    {
      title: "Chatbot Observability with Langfuse",
      description: "Integrating Langfuse to a basic chatbot to trace the conversation, token counts, and cost management. Used agentic approach such as Langfuse Skills to debug or any sort of queries done in natural language",
      tags: ["Langfuse", "Langchain"],
      github: "https://github.com/nakibworkspace/chatbot-observability",
      demo: null,
    },
    {
      title: "Fraud Detection Pipeline",
      description: "Full ML pipeline from data ingestion to model serving. Includes feature engineering, experiment tracking with MLflow, and data drift monitoring with Evidently AI.",
      tags: ["MLflow", "Evidently", "Scikit-learn", "FastAPI", "Docker", "Airflow"],
      github: "https://github.com/nakibworkspace/Fraud-detection-pipeline",
      demo: null,
    },
    {
      title: "RAG-based Knowledge Retrieval System",
      description: "End-to-end Retrieval-Augmented Generation pipeline with vector embeddings, semantic search, and LLM-powered answer synthesis. Deep dived into advance RAG systems such as chunking strategies, indexing, Retrievals, Agentic RAG, CRAG as well",
      tags: ["RAG", "LangChain", "FastAPI", "Langfuse", "Vector DB"],
      github: "https://github.com/nakibworkspace/rag-labs",
      demo: null,
    },
    {
      title: "FastAPI + Postgres + Alembic Migration Demo",
      description: "Single-app Docker Compose stack demonstrating a FastAPI service talking to Postgres with Alembic-driven migrations — environment templated, health endpoint, and CRUD surface for users and items. Built as a reference pattern for clean migration jobs.",
      tags: ["FastAPI", "PostgreSQL", "Alembic", "Docker Compose"],
      github: null,
      demo: null,
      scope: "Internal demo",
    },
    {
      title: "Ride-Sharing Natural Language Analytics",
      description: "Agentic analytics layer for ride-sharing data. Ask a question in plain English — \"traffic in Airport\", \"top 5 destinations by rides\", \"cancellation rate\" — and an AI agent writes the SQL, validates it, runs it against a Postgres warehouse, picks the right chart, and ships a live Metabase dashboard. Built with Puku CLI skills for the agent orchestration, PostgreSQL as the warehouse, and Metabase for the front-end dashboard surface.",
      tags: ["Puku CLI", "Agentic AI", "PostgreSQL", "Metabase", "NL2SQL", "Analytics"],
      github: "https://github.com/nakibworkspace/Natural-Language-Analytics/tree/main",
      demo: null,
    },
    // ← ADD MORE PROJECTS HERE. Copy any object above and change the values.
  ];


  // ─── NAVIGATION TABS ───────────────────────────────────────
  // Controls the tab buttons in the navbar.
  // The "id" must match a key in the `sections` object in App.jsx.
  export const navTabs = [
    { id: "home",       label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "research",   label: "Research" },
    { id: "projects",   label: "Projects" },
    { id: "education",  label: "Education" },
    { id: "connect",    label: "Connect" },
  ];
