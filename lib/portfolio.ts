export type TaglineSegment = {
  t: string;
  /** render in the primary "ink" color as a key phrase */
  strong?: boolean;
  /** render as a link */
  href?: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  dates: string;
  current?: boolean;
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Education = {
  school: string;
  degree: string;
  location: string;
  dates: string;
};

export type Social = {
  label: string;
  href: string;
};

export const tagline: TaglineSegment[] = [
  { t: "Software engineer and CS master's student at " },
  { t: "USC", strong: true },
  { t: ", building " },
  { t: "AI systems", strong: true },
  { t: ", " },
  { t: "distributed backends", strong: true },
  { t: ", and " },
  { t: "developer tools", strong: true },
  { t: "." },
];

export const now =
  "Research intern at USC Minerva Labs — architecting automated AWS data pipelines and an LLM-powered analytics dashboard that lets researchers query labor-market data in natural language.";

export const experience: Experience[] = [
  {
    role: "Research Intern",
    company: "USC Minerva Labs",
    location: "Los Angeles, CA",
    dates: "Jan 2026 — Present",
    current: true,
    highlights: [
      "Architected backend infrastructure and automated AWS pipelines aggregating thousands of labor-market data points weekly.",
      "Built an interactive analytics dashboard with an integrated LLM chatbot for natural-language querying of scraped job-posting datasets.",
      "Ran high-volume extraction on async task queues with Celery, Redis, and Celery Beat; containerized services with Docker.",
    ],
  },
  {
    role: "Research Intern",
    company: "IIT Hyderabad",
    location: "Hyderabad, India",
    dates: "Aug 2024 — Dec 2024",
    highlights: [
      "Optimized a Siamese neural-network pipeline, cutting processing time 15% through architectural changes.",
      "Built a binary-similarity visualization app (React, Django, Celery) with Prometheus/Grafana observability and CI/CD that cut deploy time 30%.",
      "Benchmarked RL reward algorithms on SPEC2017 to improve compiler inlining decisions.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Google Summer of Code · Liquid Galaxy",
    location: "Remote",
    dates: "Jun 2024 — Aug 2024",
    highlights: [
      "Built a Flutter app integrating Google Maps on the Liquid Galaxy rig via KML and SSH automation.",
      "Shipped an AI tourism assistant with Gemma 7B + LangChain; LLM deployment on Rocky Linux cut latency 48%.",
      "Wrote wiki documentation adopted by 200+ contributors.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Ombre",
    location: "Remote",
    dates: "Apr 2023 — Jul 2023",
    highlights: [
      "Launched a multi-host live-streaming platform (Agora, WebRTC) scaling to 5,000+ users in weekly production rollouts.",
      "Built a Razorpay-powered private-events feature that drove a 20% increase in premium users.",
      "Cut video access time 40% with Mux storage and HLS adaptive-bitrate streaming.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "Go", "C/C++", "Java", "TypeScript", "R", "SQL", "Dart"],
  },
  {
    category: "AI / ML",
    items: [
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "spaCy",
      "OpenCV",
      "scikit-learn",
    ],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Django", "Flask", "Spring Boot", "Node.js"],
  },
  {
    category: "Data & Infra",
    items: ["PostgreSQL", "Redis", "Qdrant", "Docker", "AWS", "GCP"],
  },
  {
    category: "Observability",
    items: ["Prometheus", "Grafana", "Jaeger", "GitHub CI/CD"],
  },
];

export const education: Education[] = [
  {
    school: "University of Southern California",
    degree: "M.S. Computer Science",
    location: "Los Angeles, CA",
    dates: "Aug 2025 — May 2027",
  },
  {
    school: "Vishwakarma Institute of Technology",
    degree: "B.Tech Computer Engineering",
    location: "Pune, India",
    dates: "Aug 2021 — May 2025",
  },
];

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/manas-33" },
  { label: "LinkedIn", href: "https://linkedin.com/in/manasdalvi" },
  { label: "Email", href: "mailto:manasman@usc.edu" },
];
