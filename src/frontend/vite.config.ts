import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import { defineConfig } from 'vite';
import sitemapGenerator from './src/plugins/sitemap-generator';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), sitemapGenerator({
    filter: ['/404']
  }), sveltekitOG(),],
  server: {
    allowedHosts: [".lukaskarel.at"]
  },
  optimizeDeps: {
    exclude: ['fs']
  },
  envPrefix: 'VITE',
});
