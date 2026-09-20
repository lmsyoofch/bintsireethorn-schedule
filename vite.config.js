import { defineConfig } from 'vite';

// Development only. Vercel serves the authored static files in dist directly.
export default defineConfig({
  root: 'dist',
  server: { host: '0.0.0.0', allowedHosts: ['terminal.local'] }
});
