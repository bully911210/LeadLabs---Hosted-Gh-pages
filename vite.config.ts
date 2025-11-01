import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// Plugin to update sitemap with current build date
function sitemapDatePlugin(): Plugin {
  return {
    name: 'sitemap-date-plugin',
    closeBundle() {
      const sitemapPath = path.resolve(__dirname, 'dist', 'sitemap.xml');
      if (fs.existsSync(sitemapPath)) {
        const buildDate = new Date().toISOString().split('T')[0];
        let content = fs.readFileSync(sitemapPath, 'utf-8');
        content = content.replace('__BUILD_DATE__', buildDate);
        fs.writeFileSync(sitemapPath, content);
        console.log(`✓ Updated sitemap.xml with build date: ${buildDate}`);
      }
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), sitemapDatePlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
