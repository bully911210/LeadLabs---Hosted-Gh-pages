import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { glob } from 'glob';

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

// Plugin to copy HTML files to dist
function htmlCopyPlugin(): Plugin {
  return {
    name: 'html-copy-plugin',
    closeBundle() {
      // Copy all HTML files to dist
      const htmlFiles = [
        'audit.html',
        'dfy.html',
        'dwy.html',
        'live.html',
        'contact.html',
        'privacy.html',
        'terms.html'
      ];
      
      htmlFiles.forEach(file => {
        const src = path.resolve(__dirname, file);
        const dest = path.resolve(__dirname, 'dist', file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`✓ Copied ${file} to dist`);
        }
      });
      
      // Copy case studies directory
      const caseStudiesDir = path.resolve(__dirname, 'case-studies');
      const distCaseStudiesDir = path.resolve(__dirname, 'dist', 'case-studies');
      
      if (fs.existsSync(caseStudiesDir)) {
        if (!fs.existsSync(distCaseStudiesDir)) {
          fs.mkdirSync(distCaseStudiesDir, { recursive: true });
        }
        
        const caseStudyFiles = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.html'));
        caseStudyFiles.forEach(file => {
          const src = path.join(caseStudiesDir, file);
          const dest = path.join(distCaseStudiesDir, file);
          fs.copyFileSync(src, dest);
          console.log(`✓ Copied case-studies/${file} to dist`);
        });
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
      plugins: [react(), sitemapDatePlugin(), htmlCopyPlugin()],
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
