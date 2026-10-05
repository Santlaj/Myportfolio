import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const siteUrl = 'https://santlaj.in';
const siteDomain = 'santlaj.in';

export default defineConfig({
  site: siteUrl,
  server: {
    host: true,
    port: 4321,
  },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: [siteDomain]
  },
  compressHTML: true,
  scopedStyleStrategy: 'where'
});