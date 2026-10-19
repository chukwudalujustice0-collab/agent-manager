import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages serves the app under a subpath (e.g. /pos-manager/) only when
// built in GitHub Actions. In local dev and AI Studio, we serve from root.
const base = process.env.GITHUB_ACTIONS ? (process.env.VITE_BASE_PATH || '/') : '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
