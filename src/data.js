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
    cvLink: "/projects/Nakib_Ahmed_cv.pdf",
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
  // Optional per-entry fields used by Education.jsx:
  //   scope  — small pill rendered next to the role title
  //   logo   — path to an image shown on a dark tile (good for
  //            logos with dark backgrounds like the Robolution one)
  //   problem — one-line narrative framing, mirrors the Experience
  //            section's problem field for consistency
  export const leadership = [
    {
      role: "Lead Organizer — MIE Robolution 1.0",
      institution: "Department of Mechatronics & Industrial Engineering, CUET",
      period: "May 2025",
      scope: "National competition",
      logo: "/projects/robolution.jpg",
      problem: "Took a fresh department-wide initiative from blank page to a three-day national robotics festival — the first edition, with no playbook to copy from.",
      points: [
        "Led end-to-end organisation of MIE Robolution 1.0, CUET's three-day national robotics festival (8–10 May 2025), drawing 700+ students from 41+ universities across Bangladesh.",
        "Coordinated seminars, competitions, a project showcase, and closing ceremony; ran flagship tracks including Soccer Bot, Line Following Robot, CAD modelling, and Techathon (CUET's first on-site hardware-software hybrid hackathon).",
      ],
    },
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


  // ─── RAG PoCs — explored techniques ──────────────────────
  // Ordered from basic RAG → advanced. Rendered inside the
  // RagPocModal as a serial gallery of diagrams with short
  // explanations of what each one was scoped to solve.
  export const ragPocs = [
    {
      title: "RAG Architecture",
      image: "/assets/RAG/rag-architecture-overview.svg",
      description:
        "Baseline RAG pipeline: PDF loader → text splitter → embeddings → vector store → retriever → augmentation → LLM. The reference architecture I keep coming back to whenever I scope a new PoC. everything else in this gallery is a variant or extension of this flow.",
    },
    {
      title: "PDF Indexing — Two-Tier Summary + Detail Stores",
      image: "/assets/RAG/pdf-indexing-two-tier-summary-and-detail-stores.svg",
      description:
        "Index a long PDF twice: once at page level via map_reduce summarization (Summary Store, 1 vector/page for fast recall), and once at chunk level (Detail Store, N vectors/page for precise answers). The retriever picks top-K pages from the Summary Store, then drills into the Detail Store of those pages. Cuts token cost vs. indexing everything at full resolution.",
    },
    {
      title: "PDF Indexing — Document Title Prepending",
      image: "/assets/RAG/pdf-indexing-document-title-prepending.svg",
      description:
        "LLM generates a document title once (tiktoken-truncated to 4000 tokens), then prepends it as a header to every chunk before embedding. Solves the classic 'orphan chunk' problem where a chunk about revenue figures loses all context if the document title isn't nearby. Cheap, surprisingly effective.",
    },
    {
      title: "PDF Indexing — Proposition Chunking",
      image: "/assets/RAG/pdf-indexing-proposition-chunking.svg",
      description:
        "Two-LLM pipeline: LLM #1 decomposes each chunk into atomic self-contained propositions, LLM #2 grades them on accuracy + clarity and drops weak ones. Surviving propositions are embedded instead of raw paragraphs. Boosts retrieval precision on technical/legal text where one paragraph mixes several facts.",
    },
    {
      title: "Self-RAG / Corrective — Decide-Retrieve-Filter-Candidates",
      image: "/assets/RAG/self-rag-corrective-decide-retrieve-filter-candidates.svg",
      description:
        "7-step pipeline: LLM-as-Judge first decides whether retrieval is even needed. If yes, retrieve top-k, filter by relevance, generate one candidate per chunk, score each on (support, utility), pick the best. Falls back to parametric memory or no-context generation when no chunk clears the threshold. Reduces hallucinations on questions that don't need external knowledge.",
    },
    {
      title: "Multi-Query Transformation — Rewrite / Step-Back / Sub-Query",
      image: "/assets/RAG/multi-query-transformation-rewrite-stepback-subquery.svg",
      description:
        "Generate 4 variants of the user query (rewritten, step-back abstracted, sub-queries decomposed), retrieve ~60–80 detailed chunks across all variants, then merge into one final answer. Improves recall on ambiguous or compound questions where a single query misses relevant chunks.",
    },
    {
      title: "HyDE — Hypothetical Document Embeddings",
      image: "/assets/RAG/hyde-hypothetical-document-embeddings.svg",
      description:
        "Instead of embedding the raw user query, prompt an LLM to write a hypothetical answer, embed that, then retrieve. The hypothesis sits in the same embedding space as real documents, so cosine similarity works much better than query-vs-chunk matching. Strong for short, vague queries.",
    },
    {
      title: "GraphRAG — 1-Hop Graph Walk",
      image: "/assets/RAG/graphrag-1hop-walk.svg",
      description:
        "Build an entity/relation graph over the corpus and traverse it for relational questions ('Who is Aristotle?' → Plato via teacher edge). Standard RAG only sees local chunks; graph walks expose multi-hop reasoning that would otherwise need an LLM to stitch together.",
    },
    {
      title: "CRAG — Corrective RAG with Web Fallback",
      image: "/assets/RAG/crag-corrective-rag-with-web-fallback.svg",
      description:
        "Retriever feeds an LLM Judge; the judge branches into three paths — confident best doc, mix doc + web search, or pure web fallback. Handles queries where the index is stale or wrong by actively correcting itself with live search. Practical pattern for production where knowledge drift is a real risk.",
    },
    {
      title: "Retrieval Reranking — LLM Judge vs Cross-Encoder",
      image: "/assets/RAG/retrieval-reranking-llm-judge-vs-cross-encoder.svg",
      description:
        "Two reranking strategies compared on the same top-15 candidates: an LLM-as-Judge using RatingScore (~1s per pair, slow but flexible) vs a Cross-Encoder like ms-marco-MiniLM-L-6-v2 (~10ms per pair, fast but generic). Cross-encoder wins on latency, LLM judge wins when relevance requires reasoning.",
    },
    {
      title: "Retrieval Reranking — LLM-as-Judge with Feedback Log",
      image: "/assets/RAG/retrieval-reranking-llm-as-judge-with-feedback-log.svg",
      description:
        "LLM judge scores candidates on relevance (1–5) and quality (1–5), picks the adjusted top doc, and logs the full judgment to feedback.jsonl. The log becomes the training signal for the nightly retraining loop.",
    },
    {
      title: "Feedback Loop — Nightly CRON Retraining",
      image: "/assets/RAG/feedback-loop-nightly-cron-retraining.svg",
      description:
        "Every night a CRON job reads feedback.jsonl, filters for high-rated QA pairs, and re-indexes them into the AI Brain Index. Production queries from tomorrow silently benefit from yesterday's answers that users (or evaluators) approved. Closes the loop between retrieval quality and human feedback.",
    },
    {
      title: "Agentic RAG — ReAct Loop with Tools",
      image: "/assets/RAG/agentic-rag-react-loop-with-tools.svg",
      description:
        "ReAct agent instead of a single retrieve-then-answer chain. The agent reasons step-by-step and calls tools as needed: doc_search for retrieval, calculator for arithmetic, web_search for live facts. Each tool call is observed and the loop continues until the agent emits a Final Answer. Most flexible but also the most expensive — scoped to queries that justify it.",
    },
  ];


  // ─── Credit Card Approval Prediction — what's integrated ──
  // Serial gallery mirroring RagPocModal: first entry is the
  // architecture-overview hero (with the diagram shown once at
  // the top), the rest are the individual steps with the
  // features integrated per step. Triggered by the Preview
  // button on the project card via preview="cardApprovalLabs".
  export const cardApprovalLabs = [
    {
      title: "Credit Card Approval — Architecture Overview",
      image: "/assets/Credit-card-prediction/diagram.svg",
      description:
        "End-to-end MLOps pipeline: data preprocessing → Airflow + MLflow training → MLflow Model Registry → FastAPI serving with Redis cache → Grafana/Prometheus monitoring → Pulumi-provisioned AWS infra (S3, VPC, EC2) → GitHub Actions CI/CD to three EC2 instances. The diagram below is how I keep all five steps in my head whenever I touch this repo.",
      bullets: [
        "Automated ML Pipeline with Airflow & MLflow",
        "FastAPI Model Serving with Caching",
        "Monitoring & Observability Stack",
        "Production Infrastructure with Pulumi & S3",
        "CI/CD with GitHub Actions & EC2 Deployment",
      ],
    },
    {
      title: "1. Automated ML Pipeline with Airflow & MLflow",
      description:
        "Began by analyzing the credit card approval dataset and surfacing the data quality challenges (missing values, mixed scales, class imbalance, categorical encodings). Picked the model family based on dataset properties + business requirements rather than reaching for the biggest one. Built a preprocessing pipeline with SMOTE, scaling, encoding, and feature engineering. Stood up Apache Airflow on Docker Compose for orchestration, authored DAGs to automate the full training workflow, integrated MLflow for experiment tracking inside Airflow tasks, and registered the best-performing models to the MLflow Model Registry with proper stage transitions (Staging → Production).",
    },
    {
      title: "2. FastAPI Model Serving with Caching",
      description:
        "Designed RESTful APIs following serving best practices (versioned routes, clear error contracts). Models load dynamically from the MLflow Model Registry — no hardcoded paths, just request the stage you want. Input validation through Pydantic schemas with business rules so garbage doesn't reach the model. Added Redis caching to push repeated requests below 1ms. Every prediction is logged to Postgres for audit trails and drift monitoring later. Added health and readiness endpoints so this can drop into a Kubernetes-style deployment. The serving-side preprocessing pipeline mirrors the training one exactly so train/serve skew stays at zero.",
    },
    {
      title: "3. Monitoring & Observability Stack for Production Error Handling",
      description:
        "Production-grade error handling and observability. Provisioned the Grafana datasource declaratively, built a custom dashboard for the ML-specific metrics I care about (latency, drift signals, cache hit ratio, prediction distribution). Added Nginx as a reverse proxy so the FastAPI surface is fronted properly. Wired all of this into the Docker Compose stack alongside Prometheus + Grafana. The prediction endpoint itself emits the metrics that feed the dashboard — closed loop from the request to the operator's screen.",
    },
    {
      title: "4. Production Infrastructure with Pulumi and S3",
      description:
        "Defined the AWS surface in code with Pulumi: S3 for artifact storage, VPC + Security Groups for network isolation, EC2 instances for the workload — separated across a 3-instance architecture (training, serving, monitoring) so a failure in one tier doesn't take the others down. Pointed MLflow at S3 for artifact storage so models and run metadata survive container rebuilds. Cross-service communication runs inside the VPC. Managed infrastructure state and outputs through Pulumi so the whole stack is reproducible from a single `pulumi up`.",
    },
    {
      title: "5. CI/CD with GitHub Actions & EC2 Deployment",
      description:
        "Wired GitHub Actions workflows for the full CI/CD surface: automated tests, code-quality checks, security scans (CodeQL, Bandit, Safety). Docker images built and pushed to DockerHub from CI. Deploy job SSHes into the three EC2 instances and pulls the new image straight from DockerHub — environment secrets (DB URLs, MLflow URI, Redis host) are written to each instance during deploy so the same image runs correctly everywhere. Prerequisites intentionally listed: completed earlier steps, GitHub repo, and the three EC2 instances already up.",
    },
  ];


  // ─── Fraud Detection Pipeline — what's integrated ──────────
  // Serial gallery mirroring RagPocModal: first entry is the
  // architecture-overview hero (with the diagram shown once at
  // the top), the rest are the individual steps with the
  // features integrated per step. Triggered by the Preview
  // button on the project card via preview="fraudDetectionLabs".
  export const fraudDetectionLabs = [
    {
      title: "Fraud Detection Pipeline — Architecture Overview",
      image: "/assets/Fraud-detection-pipeline/fraud-det.svg",
      description:
        "End-to-end fraud detection system on AWS: MongoDB on a private EC2 as the data store → Feast feature store (online + offline) → Airflow-orchestrated feature engineering pipeline → MLflow Model Registry on EC2 → training pipeline comparing XGBoost, LightGBM, and Isolation Forest. The diagram below is how I keep all five steps in my head whenever I touch this repo.",
      bullets: [
        "Deploying MongoDB in EC2 Instance as a Data Store",
        "Deploying a Scalable Feature Store with Feast on AWS",
        "Deploying a Feature Engineering Pipeline with Airflow",
        "Deploying an MLflow Model Registry on AWS with Pulumi to Store Trained Models",
        "Deployment of a Model Training Pipeline and Tracking System with MLflow",
      ],
    },
    {
      title: "1. Deploying MongoDB in EC2 Instance as a Data Store",
      description:
        "Provisioned AWS infrastructure (VPC, subnets, NAT Gateway, EC2 instances) with Pulumi and configured a secure network architecture with public + private subnets so the data tier is never directly reachable from the internet. Installed and configured MongoDB on a private EC2 instance through automation scripts (no manual SSH-and-install), transferred the large dataset securely between instances, and imported the CSV into MongoDB collections via mongoimport. Verified the database setup end-to-end and validated data integrity so downstream steps could trust the rows.",
    },
    {
      title: "2. Deploying a Scalable Feature Store with Feast on AWS",
      description:
        "Created AWS infrastructure with Pulumi — VPC, EC2, subnets, networking, security groups, and S3 — then installed and configured Feast both via the script-based path and manually, so I know both ways and can pick whichever fits the environment. Verified Feast works against an online store (Redis or SQLite) plus an offline store, and launched a simple Feast Feature Server to store and retrieve feature data. The point was to get feature serving off notebooks and into a real store before any training code touched it.",
    },
    {
      title: "3. Deploying a Feature Engineering Pipeline with Airflow",
      description:
        "Tied everything together: provisioned AWS infra programmatically with Pulumi, installed and configured MongoDB, Feast, and Airflow on EC2 instances, then built the feature engineering pipeline in Python as Airflow DAGs. Processed data is stored and retrieved from Feast as the feature store of record, and the whole pipeline is verified and monitored through Airflow's web UI. This is the lab that converted a collection of services into an actual moving pipeline.",
    },
    {
      title: "4. Deploying an MLflow Model Registry on AWS with Pulumi to Store Trained Models",
      description:
        "Provisioned AWS infra (VPC, EC2, S3) with Pulumi, installed and configured MLflow on an EC2 instance, and verified the deployment by reaching the MLflow web UI from outside. Used a bastion host for secure access into the private resources so the registry endpoint isn't publicly exposed. The registry sits on S3-backed artifact storage so model files survive container rebuilds, and run metadata lives alongside them — this is the storage layer the training pipeline will write into next.",
    },
    {
      title: "5. Deployment of a Model Training Pipeline and Tracking System with MLflow",
      description:
        "Set up AWS infra (VPC, EC2, S3) with Pulumi, installed and configured Apache Airflow to orchestrate the ML pipeline, stood up Feast for feature management, and uploaded feature data into Feast. Built and ran a training DAG that trains and compares ML models — XGBoost, LightGBM, Isolation Forest — with MLflow tracking every run. Verified the whole loop by hitting Airflow and MLflow UIs and reviewing model performance side by side to pick the candidate that goes into the registry.",
    },
  ];


  // ─── Chatbot Observability — features walkthrough ──────────
  // Serial gallery mirroring RagPocModal: first entry is the
  // hero (project overview + structure), the rest are the
  // sections of features.md. Each section renders a long-form
  // description plus an optional `images` array (the
  // screenshots hosted on the project's GitHub repo). Used for
  // projects whose gallery is mixed text + screenshots rather
  // than a single architecture diagram.
  export const chatbotObservabilityPocs = [
    {
      title: "Chatbot Observability — Overview",
      image: "/assets/Chatbot-Observability/img1.png",
      description:
        "A Python CLI chatbot powered by MiniMax, with Langfuse wired in for full-stack LLM observability. The repo is intentionally tiny — three Python files plus .env — so the integration surface is easy to read. config.py loads credentials and initializes the Langfuse client. llm.py wraps the API calls with @observe so every LLM call is auto-traced. chatbot.py runs the chat loop, builds the message list per turn (system prompt + history + current user message), strips chain-of-thought from the assistant reply, and flushes Langfuse on exit. Setup is the standard venv → requirements.txt → .env → python chatbot.py flow.",
      bullets: [
        "Project structure (3 files)",
        "Setup steps and required env vars",
        "Hero screenshot — chatbot in action",
        "Langfuse Integration (@observe + flush)",
        "Langfuse UI views (All Traces / Trace / Log)",
        "Langfuse Skills in Puku",
        "History management",
      ],
      images: [
        {
          src: "/assets/Chatbot-Observability/img1.png",
          alt: "Chatbot running in CLI",
          caption: "Chatbot running in CLI — MiniMax-powered chat with full Langfuse tracing behind it.",
        },
      ],
    },
    {
      title: "1. Langfuse Integration",
      description:
        "Langfuse is wired in two places. First, llm.py decorates call_llm with @observe(capture_input=True, capture_output=True), so every LLM call auto-creates a Langfuse trace recording the full input message list, the raw output, model name, latency, and token usage (when the API returns them). Second, chatbot.py calls langfuse.flush() when the user types exit/quit, so buffered spans are guaranteed to upload before the process exits. From there, traces are reviewable two ways — either via the Langfuse CLI through npx langfuse-cli --env .env api traces list, or by jumping straight into the Langfuse UI for the full All Traces / Trace / Log drill-down.",
      images: [
        {
          src: "/assets/Chatbot-Observability/img6.png",
          alt: "Langfuse — All Traces view",
          caption: "All Traces — every chat session shows up here, sortable by timestamp and filtered by metadata.",
        },
        {
          src: "/assets/Chatbot-Observability/img7.png",
          alt: "Langfuse — Trace View",
          caption: "Trace View — input message list, output text, latency, and token usage for one specific call.",
        },
        {
          src: "/assets/Chatbot-Observability/img8.png",
          alt: "Langfuse — Log View",
          caption: "Log View — span-level breakdown of a trace (system / user / assistant / latency per step).",
        },
      ],
    },
    {
      title: "2. Langfuse Skills in Puku",
      description:
        "Puku reads skills — markdown files containing documentation references and CLI recipes — to operate tools in natural language. The Langfuse skill is installed with `npx skills add langfuse/skills --skill \"langfuse\"`, which drops it into .agents/skills/langfuse/. Copying it to .puku-cli/skills/langfuse/ activates it under Puku's alternative convention. Once installed, you can ask things like \"list my last 10 traces\", \"get details of trace abc123...\", or \"analyze my recent error traces\" — Puku reads the relevant reference guide and runs the matching langfuse-cli commands. The skill ships with eight reference docs (cli.md, instrumentation.md, prompt-migration.md, user-feedback.md, error-analysis.md, judge-calibration.md, sdk-upgrade.md, skill-feedback.md) covering the common operational surfaces. Because Puku spawns a fresh shell per command, you always pass --env .env so the CLI can load credentials from the .env file instead of inheriting anything from the host shell.",
      images: [
        {
          src: "/assets/Chatbot-Observability/img2.png",
          alt: "Puku — langfuse skill installation",
          caption: "Skill installation — `npx skills add langfuse/skills --skill \"langfuse\"` and a copy into .puku-cli/skills/.",
        },
        {
          src: "/assets/Chatbot-Observability/img3.png",
          alt: "Puku — last 10 traces",
          caption: "Natural-language query — \"List my last 10 traces\" — Puku shells out to langfuse-cli and renders the result.",
        },
        {
          src: "/assets/Chatbot-Observability/img4.png",
          alt: "Puku — trace detail",
          caption: "Trace detail — \"Get details of trace abc123...\" pulls the full trace, including input/output and timing.",
        },
        {
          src: "/assets/Chatbot-Observability/img5.png",
          alt: "Puku — error trace analysis",
          caption: "Error analysis — \"Analyze my recent error traces\" — Puku reads error-analysis.md and runs the appropriate filters.",
        },
      ],
    },
    {
      title: "3. History Management",
      description:
        "The chatbot keeps a history list that grows with each turn: history = [user_msg_1, assistant_reply_1, user_msg_2, assistant_reply_2, ...]. Every build_messages call assembles [system_prompt, ...history, current_user_msg] — note the current message is NOT prepended to history, which prevents the previous turn's verbose chain-of-thought reply from polluting the next LLM input. On the output side, extract_final_answer strips <think>... blocks and returns only the last paragraph so the user sees a clean answer instead of the model's raw reasoning.",
    },
  ];


  // ─── Data Lake and Warehouse — R&D Labs ────────────────────
  // Serial gallery mirroring RagPocModal: first entry is the
  // overview hero (with diagram), the rest are the four R&D
  // labs. Each lab ships its own architecture diagram so each
  // section renders a figure alongside its description.
  export const datalakeProjects = [
    {
      title: "Data Lake and Warehouse — Overview",
      image: "/assets/Datalake-management/project1.svg",
      description:
        "Four R&D labs covering the modern data stack end-to-end. Lab 1 is a ClickHouse + dbt + Grafana + Prometheus analytics warehouse on NYC taxi data. Lab 2 builds a PostgreSQL star-schema warehouse with BRIN indexes and materialized views. Lab 3 is a Spark-on-S3 data lake ingestion pipeline in Bronze-Silver-Gold. Lab 4 unifies it all into a lakehouse that lands NYC taxi data through Spark and aggregates into ClickHouse — same pattern Databricks/Netflix/Uber use to bridge their data platforms.",
      bullets: [
        "Project 1 — NYC Taxi Trip Analytics (Modern Data Warehouse)",
        "Project 2 — PostgreSQL Star-Schema Warehouse",
        "Project 3 — Spark + S3 Data Lake Ingestion (Medallion)",
        "Project 4 — Unified Lakehouse with Medallion Architecture",
      ],
    },
    {
      title: "1. NYC Taxi Trip Analytics — Modern Data Warehouse",
      image: "/assets/Datalake-management/project1.svg",
      description:
        "End-to-end data warehouse lab: ingest NYC taxi data into ClickHouse, transform with dbt across Bronze / Silver / Gold layers, visualize in Grafana, and monitor the pipeline with Prometheus. The diagram shows the full ingestion → modeling → visualization → monitoring surface and how ClickHouse, dbt, Grafana, and Prometheus wire together in this lab.",
    },
    {
      title: "2. Building a Data Warehouse with PostgreSQL and Star Schema",
      image: "/assets/Datalake-management/project2.svg",
      description:
        "Production-grade analytical data warehouse built from scratch on real NYC Yellow Taxi trip data. Designed a star schema, loaded ~6 million trip records into range-partitioned tables, created BRIN indexes for efficient time-range lookups, and pre-computed business metrics via materialized views. Each chapter introduces a core warehousing concept and immediately applies it to real data — by the end the warehouse answers questions like 'Which borough generates the most revenue?' or 'How do tipping patterns differ between credit card and cash payments?' in milliseconds instead of minutes.",
    },
    {
      title: "3. Building a Data Lake Ingestion Pipeline with Spark and S3",
      image: "/assets/Datalake-management/project3.svg",
      description:
        "Production-style data lake pipeline from scratch. Ingests raw e-commerce order events into Amazon S3, transforms them into optimized Parquet with Apache Spark, and runs SQL analytics directly on the lake — same pattern data teams at Netflix, Uber, and Airbnb use. The pipeline follows the Bronze-Silver-Gold architecture (Medallion Architecture), the industry standard for organizing data in a lakehouse.",
    },
    {
      title: "4. Building a Unified Lakehouse with the Medallion Architecture",
      image: "/assets/Datalake-management/project4.svg",
      description:
        "Complete data lakehouse pipeline using the Medallion (Bronze-Silver-Gold) architecture. Ingests raw NYC Yellow Taxi trip data, cleans and validates with Apache Spark, aggregates into business-ready tables, and loads the results into ClickHouse as the analytical warehouse. Same pattern data teams at Databricks, Netflix, and Uber use to unify their data platforms.",
    },
  ];


  // ─── PROJECTS / GITHUB REPOS ───────────────────────────────
  // Each object = one project card.
  // Set "demo" to a URL if you have a live demo, or keep it null.
  export const projects = [
    {
      title: "Credit Card Approval Prediction",
      description: "End-to-end MLOps pipeline for credit card approval prediction. Covers data preprocessing, automated training with Airflow + MLflow, FastAPI model serving with Redis caching, a Grafana/Prometheus monitoring stack, AWS infrastructure provisioned via Pulumi, and CI/CD to three EC2 instances via GitHub Actions. Same project was built incrementally across five labs.",
      tags: ["Airflow", "MLflow", "FastAPI", "Redis", "Grafana", "Pulumi", "GitHub Actions", "Docker"],
      github: "https://github.com/nakibworkspace/card-approval-prediction-mlops",
      demo: null,
      image: "/assets/Credit-card-prediction/diagram.svg",
      preview: "cardApprovalLabs",
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
      description: "Four R&D labs covering the modern data stack end-to-end: a ClickHouse + dbt + Grafana + Prometheus analytics warehouse on NYC taxi data, a PostgreSQL star-schema warehouse with BRIN indexes and materialized views, a Spark-on-S3 data lake ingestion pipeline in Bronze-Silver-Gold, and a unified lakehouse that lands NYC taxi data through Spark and aggregates into ClickHouse.",
      tags: ["PostgreSQL", "ClickHouse", "dbt", "Apache Spark", "AWS S3", "Grafana", "Prometheus", "Medallion"],
      github: "https://github.com/nakibworkspace/datalake-management/tree/main",
      demo: null,
      image: "/assets/Datalake-management/project1.svg",
      preview: "datalakeProjects",
    },
    {
      title: "Chatbot Observability with Langfuse",
      description: "Python CLI chatbot instrumented with Langfuse for full-stack LLM observability — every call is auto-traced via @observe, spans flush on exit, and a Puku skill lets you query traces, debug errors, and audit prompts in natural language. Walks through project structure, the @observe integration pattern, Langfuse UI views, and the Puku skill workflow.",
      tags: ["Langfuse", "Python", "CLI", "Observability", "Puku Skills"],
      github: "https://github.com/nakibworkspace/chatbot-observability",
      demo: null,
      image: "/assets/Chatbot-Observability/img1.png",
      preview: "chatbotObservabilityPocs",
    },
    {
      title: "Fraud Detection Pipeline",
      description: "End-to-end fraud detection system on AWS: MongoDB data store, Feast feature store, Airflow feature engineering pipeline, MLflow model registry, and a model training pipeline tracking XGBoost, LightGBM, and Isolation Forest. Same project was built incrementally across five labs.",
      tags: ["MongoDB", "Feast", "Airflow", "MLflow", "Pulumi", "AWS", "XGBoost", "LightGBM"],
      github: "https://github.com/nakibworkspace/Fraud-detection-pipeline",
      demo: null,
      image: "/assets/Fraud-detection-pipeline/fraud-det.svg",
      preview: "fraudDetectionLabs",
    },
    {
      title: "RAG-based Knowledge Retrieval System",
      description: "End-to-end Retrieval-Augmented Generation pipeline with vector embeddings, semantic search, and LLM-powered answer synthesis. Deep dived into advance RAG systems such as chunking strategies, indexing, Retrievals, Agentic RAG, CRAG as well",
      tags: ["RAG", "LangChain", "FastAPI", "Langfuse", "Vector DB"],
      github: "https://github.com/nakibworkspace/rag-labs",
      demo: null,
      image: "/assets/RAG/rag-architecture-overview.svg",
      preview: "ragPocs",
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


  // ─── PREVIEW URL SLUGS ──────────────────────────────────────
  // Maps the camelCase `preview` keys on a project (used in
  // data.js internally) to the kebab-case URL slug used by
  // the /preview/:slug route. Keeping these separate means the
  // data can keep its existing JS-friendly keys while the URL
  // stays human-readable.
  export const previewKeyToSlug = {
    ragPocs:                     "rag-pocs",
    cardApprovalLabs:            "card-approval-labs",
    fraudDetectionLabs:          "fraud-detection-labs",
    chatbotObservabilityPocs:    "chatbot-observability",
    datalakeProjects:            "data-lake-projects",
  };
  export const previewSlugToKey = Object.fromEntries(
    Object.entries(previewKeyToSlug).map(([k, v]) => [v, k])
  );


  // ─── NAVIGATION TABS ───────────────────────────────────────
  // Controls the tab buttons in the navbar.
  // The "id" is the URL path segment (no leading slash) — so
  // id "projects" maps to /projects, id "home" maps to /.
  export const navTabs = [
    { id: "home",       label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "research",   label: "Research" },
    { id: "projects",   label: "Projects" },
    { id: "education",  label: "Education" },
    { id: "connect",    label: "Connect" },
  ];
