<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LeadLabs™ Webinar Landing Page

This is a React + Vite application for the LeadLabs webinar landing page, deployed to GitHub Pages.

View your app in AI Studio: https://ai.studio/apps/drive/1SBJlEJMhu9ukqgKZcvTI8f8g8CDkIi4O

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

> **Note:** The app currently doesn't require any API keys to run locally.

## Build

To build the production version:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions.

### Automatic Deployment

The deployment workflow (`.github/workflows/deploy.yml`):
1. Installs dependencies with `npm ci`
2. Builds the React application using `npm run build`
3. Uploads the `dist` folder as a GitHub Pages artifact
4. Deploys to GitHub Pages with proper MIME type configuration
5. Custom domain: [leadlabs.co.za](https://leadlabs.co.za)

### GitHub Pages Setup

To ensure the workflow functions correctly, verify in your repository settings:
- Go to **Settings** → **Pages**
- Under **Source**, select **GitHub Actions**
- The custom domain should be set to `leadlabs.co.za`

### Local Preview

To preview the production build locally:

```bash
npm run preview
```

### MIME Type Handling

The deployment uses GitHub Actions with `actions/deploy-pages@v4`, which ensures JavaScript module files are served with the correct MIME type (`application/javascript` or `text/javascript`) instead of `application/octet-stream`. This prevents the "Failed to load module script" error.
