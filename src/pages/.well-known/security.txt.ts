import type { APIRoute } from 'astro';
import siteConfig from '../../config/site';

export const GET: APIRoute = () => {
  const securityTxt = `Contact: mailto:${siteConfig.securityContact}
Expires: ${siteConfig.securityExpiry}
Preferred-Languages: en, pt
Canonical: ${siteConfig.url}/.well-known/security.txt
`;

  return new Response(securityTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
