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

// Plugin to copy HTML files and assets to dist
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
      
      // Copy assets directory
      const assetsDir = path.resolve(__dirname, 'assets');
      const distAssetsDir = path.resolve(__dirname, 'dist', 'assets');
      
      if (fs.existsSync(assetsDir)) {
        if (!fs.existsSync(distAssetsDir)) {
          fs.mkdirSync(distAssetsDir, { recursive: true });
        }
        
        // Copy CSS
        const cssDir = path.join(assetsDir, 'css');
        const distCssDir = path.join(distAssetsDir, 'css');
        if (fs.existsSync(cssDir)) {
          if (!fs.existsSync(distCssDir)) {
            fs.mkdirSync(distCssDir, { recursive: true });
          }
          const cssFiles = fs.readdirSync(cssDir);
          cssFiles.forEach(file => {
            fs.copyFileSync(path.join(cssDir, file), path.join(distCssDir, file));
          });
          console.log(`✓ Copied assets/css to dist`);
        }
        
        // Copy JS
        const jsDir = path.join(assetsDir, 'js');
        const distJsDir = path.join(distAssetsDir, 'js');
        if (fs.existsSync(jsDir)) {
          if (!fs.existsSync(distJsDir)) {
            fs.mkdirSync(distJsDir, { recursive: true });
          }
          const jsFiles = fs.readdirSync(jsDir);
          jsFiles.forEach(file => {
            fs.copyFileSync(path.join(jsDir, file), path.join(distJsDir, file));
          });
          console.log(`✓ Copied assets/js to dist`);
        }
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
