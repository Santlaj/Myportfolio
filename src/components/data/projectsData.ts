import siteConfig from "../../config/site";

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectData {
  title: string;
  slug: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  category: "professional" | "open-source";
  status: "planning" | "wip" | "completed";
  terminalPrompt?: string;
  terminalCommand?: string;
  stats?: ProjectStat[];
  keyWork?: string[];
}

export const projects: ProjectData[] = [
  {
    title: "StackAudit",
    slug: "stackaudit",
    caseStudyUrl: "/case-studies/stackaudit",
    description:
      "Open Source Contribution Intelligence Platform designed to help developers discover relevant open-source contribution opportunities and deeply understand repositories before contributing.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Supabase",
    ],
    githubUrl: "https://github.com/Santlaj/stackAudit",
    liveUrl: "https://stackaudit.santlaj.in",
    featured: true,
    category: "open-source",
    status: "completed",
    terminalPrompt: "stackaudit@intelligence ~ $",
    terminalCommand: "$ stackaudit scan --target=repo --match=developer",
    stats: [
      { label: "CACHE", value: "Redis Layer" },
      { label: "DATABASE", value: "PostgreSQL + Prisma" },
      { label: "MATCHING", value: "AI-Assisted" },
      { label: "BACKEND", value: "Node.js + Express" },
    ],
    keyWork: [
      "GitHub-based repository and issue discovery",
      "Developer–issue compatibility matching",
      "AI-assisted repository analysis",
      "Repository architecture and relevant-file analysis",
      "Contribution tracking and lifecycle management",
      "Redis caching for frequently accessed data",
      "PostgreSQL-based data management with Prisma ORM",
    ],
  },
  {
    title: "Digital Study Center",
    slug: "digital-study-center",
    caseStudyUrl: "/case-studies/digital-study-center",
    description:
      "Full-stack coaching management platform built for a real coaching center to streamline student management, attendance, academic resources, communication, and teacher workflows.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "Redis",
    ],
    githubUrl: "https://github.com/Santlaj/DigitalStudyCenter",
    liveUrl: "https://digitalstudycenter.in",
    featured: true,
    category: "open-source",
    status: "completed",
    terminalPrompt: "digitalstudycenter@management ~ $",
    terminalCommand: "$ dsc manage --students --attendance --academics",
    stats: [
      { label: "AUTH", value: "Supabase + MFA" },
      { label: "DATABASE", value: "PostgreSQL + Supabase" },
      { label: "CACHE", value: "Redis Layer" },
      { label: "BACKEND", value: "Node.js + Express" },
    ],
    keyWork: [
      "Student and teacher management",
      "Attendance tracking and monthly attendance history",
      "Class-based assignments, notes, and announcements",
      "Student doubts and academic communication",
      "Student analytics and fee management",
      "Role-based authentication with teacher and student access control",
      "TOTP-based MFA with backend AAL2 enforcement",
    ],
  },

  {
    title: "CAPTCHA-as-a-Service",
    slug: "captcha-as-a-service",
    caseStudyUrl: "/case-studies/captcha-as-a-service",
    description:
      "Secure CAPTCHA verification platform that provides numeric CAPTCHA generation, atomic verification, rate limiting, and signed verification tokens through a reusable API and React SDK.",
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "Redis",
      "React",
      "JWT",
      "Docker",
    ],
    githubUrl: "https://github.com/Santlaj",
    liveUrl: "",
    featured: true,
    category: "professional",
    status: "completed",
    terminalPrompt: "captcha@security ~ $",
    terminalCommand: "$ captcha verify --challenge=secure",
    stats: [
      { label: "VERIFICATION", value: "Atomic Redis" },
      { label: "SECURITY", value: "JWT + Rate Limit" },
      { label: "STORAGE", value: "Redis" },
      { label: "SDK", value: "React" },
    ],
    keyWork: [
      "Built a secure 6-digit numeric CAPTCHA generation and verification engine",
      "Implemented atomic Redis Lua verification to prevent concurrent challenge reuse",
      "Added configurable attempt limits, challenge expiration, and Redis-backed rate limiting",
      "Implemented signed JWT verification tokens using jose with expiry and claim validation",
      "Built a reusable React CAPTCHA SDK and interactive integration playground",
      "Added production security controls including CORS, request validation, trusted proxy handling, and fail-closed Redis behavior",
      "Developed unit, Redis integration, and end-to-end tests for concurrent verification and security scenarios",
    ],
  },
];
