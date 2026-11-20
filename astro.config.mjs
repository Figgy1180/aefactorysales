import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// PREVIEW=1 builds flat .html files for the artifact preview; production uses clean /folder/ URLs.
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site: 'https://aefactorysales.com',
  trailingSlash: preview ? 'ignore' : 'always',
  build: { format: preview ? 'file' : 'directory', inlineStylesheets: 'always', assets: preview ? 'assets' : '_astro' },
  outDir: preview ? './dist-preview' : './dist',
  integrations: [
    sitemap({
      lastmod: new Date(),
      filter: (page) => !/\/(thank-you|dealers\/thanks|reviews\/thanks|404)\/?$/.test(page),
    }),
  ],
  image: { responsiveStyles: false },
  // Never inline assets as data: URIs; the security policy only allows fonts from our own domain.
  vite: { build: { assetsInlineLimit: 0 } },
});
