import type { APIRoute } from 'astro';
import siteConfig from '../config/site';

export const GET: APIRoute = () => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteConfig.url}/sitemap-index.xml

# Optimize crawling
Crawl-delay: 1

# Block unnecessary paths (if any)
# Disallow: /admin/
# Disallow: /api/
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
