import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolveBasePath } from './src/lib/basePath.ts';

// GitHub Pages serves 404.html for any missing path with the address bar
// unchanged. Making it a byte-for-byte copy of index.html lets the SPA router
// handle deep links (Req 1.8, 5.4, 25.10, 25.11).
function spaFallback404(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    async writeBundle(options) {
      const outDir = options.dir ?? resolve('dist');
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

// publicDir stays at its default (public/), so dist/ holds only index.html,
// 404.html, favicon.png and assets/; nothing is named after a route segment.
export default defineConfig({
  base: resolveBasePath(process.env.BASE_PATH),
  plugins: [react(), spaFallback404()],
});
