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

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

The deployment workflow:
1. Builds the React application using Vite
2. Deploys the `dist` folder to GitHub Pages
3. Custom domain: [leadlabs.co.za](https://leadlabs.co.za)

### Manual Deployment

To preview the production build locally:

```bash
npm run preview
```
