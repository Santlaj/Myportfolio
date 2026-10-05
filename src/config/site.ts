export const siteConfig = {
  domain: "santlaj.in",
  url: "https://santlaj.in",

  email: "santlaj.dev@gmail.com",

  name: "Santlaj Kumar",
  title: "Software Engineer & Full-Stack Developer",

  github: "https://github.com/Santlaj",
  linkedin: "https://www.linkedin.com/in/santlaj-kumar-mehta-23541a320/",

  description:
    "Santlaj Kumar is a B.Tech Computer Science & Engineering student at Lovely Professional University focused on software engineering, backend systems, DSA, and practical products.",
  keywords: [
    "Santlaj Kumar",
    "Software Engineer",
    "Full-Stack Developer",
    "C++",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Redis",
    "Prisma",
    "LeetCode",
    "LPU",
  ],

  profileImage: "/profile-photo.png",
  favicon: "/favicon.png",

  securityContact: "santlaj.dev@gmail.com",
  securityExpiry: "2026-12-31T23:59:59.000Z",
} as const;

// Helper function to get the site URL, with Vercel fallback
export const getSiteUrl = () => {
  // In production, use the configured domain
  if (import.meta.env.PROD) {
    return siteConfig.url;
  }

  // In development or preview, use Vercel URL if available, otherwise localhost
  if (import.meta.env.VERCEL_URL) {
    return `https://${import.meta.env.VERCEL_URL}`;
  }

  return "http://localhost:4321";
};

export default siteConfig;
