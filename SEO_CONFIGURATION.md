# SEO Configuration for LeadLabs GitHub Pages

This document describes the comprehensive SEO optimization that has been implemented for the LeadLabs website.

## 🎯 Overview

The following SEO features have been configured to maximize discoverability and search engine ranking:

### ✅ Core SEO Files

1. **robots.txt** (`/public/robots.txt`)
   - Allows all search engines to crawl the site
   - Points to the sitemap location
   - Includes respectful crawl-delay setting

2. **sitemap.xml** (`/public/sitemap.xml`)
   - XML sitemap for search engines
   - Includes image references
   - Properly formatted with priority and change frequency

### ✅ HTML Meta Tags

Enhanced meta tags in `index.html` include:

- **Title Tag**: Descriptive and keyword-rich
- **Meta Description**: Compelling description for search results
- **Keywords**: Relevant industry and topic keywords
- **Canonical URL**: `https://leadlabs.co.za/`
- **Robots**: Configured for maximum indexing (`index, follow`)

### ✅ Open Graph Tags (Social Media)

Complete Open Graph implementation for Facebook, LinkedIn, and other platforms:

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://leadlabs.co.za/">
<meta property="og:title" content="LeadLabs™ | The Framework That Turns Social Traffic Into Sales">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:site_name" content="LeadLabs™">
<meta property="og:locale" content="en_ZA">
```

### ✅ Twitter Card Tags

Twitter-specific meta tags for rich card display:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

### ✅ Structured Data (JSON-LD)

Two comprehensive schema.org structured data blocks:

1. **Organization Schema**: Defines LeadLabs as an organization
   - Company information
   - Founder details (Franz Badenhorst)
   - Contact information
   - Location (South Africa)

2. **WebPage + Event Schema**: Defines the page and webinar event
   - Event details (date, time, location)
   - Pricing information (Free)
   - Attendance mode (Online)

### ✅ Image Optimization

- Enhanced alt text on all images for accessibility and SEO
- Image URLs included in sitemap
- Proper image schema in JSON-LD

### ✅ Path Configuration

- All asset paths are relative (starting with `/`)
- Base path configured correctly in `vite.config.ts`
- Assets are crawlable and accessible

## 🚀 Google Indexing API Integration

### Workflow: `.github/workflows/google-indexing.yml`

A GitHub Action automatically pings Google's Indexing API whenever code is pushed to the main branch.

### Setup Instructions

To enable Google Indexing API notifications:

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable the Indexing API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Web Search Indexing API"
   - Click "Enable"

3. **Create a Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "github-indexing-bot")
   - Click "Create and Continue"
   - Grant the role "Web Search Indexing API User"
   - Click "Done"

4. **Generate Service Account Key**
   - Click on the service account you just created
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download the JSON key file

5. **Add to GitHub Secrets**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `GOOGLE_INDEXING_SERVICE_ACCOUNT_KEY`
   - Value: Paste the entire contents of the JSON file
   - Click "Add secret"

6. **Add Service Account to Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Select your property (leadlabs.co.za)
   - Go to Settings > Users and permissions
   - Add the service account email as an owner
   - The email looks like: `github-indexing-bot@your-project.iam.gserviceaccount.com`

### Testing the Workflow

Once configured, the workflow will automatically run on every push to main. You can also:
- Manually trigger it from the Actions tab
- View the run logs to confirm successful notification

### Workflow Behavior

- ✅ Runs automatically on push to main branch
- ✅ Can be triggered manually via workflow_dispatch
- ✅ Gracefully handles missing credentials (won't fail the build)
- ✅ Provides detailed logging and summary
- ✅ Notifies Google about the homepage URL

## 📊 SEO Checklist

- [x] robots.txt configured and deployed
- [x] sitemap.xml created and referenced
- [x] Comprehensive meta tags (description, keywords, author)
- [x] Canonical URL specified
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] JSON-LD structured data (Organization)
- [x] JSON-LD structured data (Event)
- [x] Image alt text optimized
- [x] Relative paths for all assets
- [x] GitHub Action for Google Indexing API
- [x] Proper robots meta tag for indexing

## 🔍 Validation Tools

Test your SEO implementation with these tools:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Validates JSON-LD structured data

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Tests Open Graph tags

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Validates Twitter Card metadata

4. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Validates JSON-LD syntax

5. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Monitor indexing status and coverage

## 📈 Expected Benefits

1. **Improved Search Rankings**: Comprehensive meta tags and structured data
2. **Better Social Sharing**: Rich previews on Facebook, Twitter, LinkedIn
3. **Faster Indexing**: Google Indexing API notifications
4. **Enhanced Snippets**: Event and Organization schema for rich results
5. **Increased Click-Through**: Optimized titles and descriptions
6. **Accessibility**: Proper alt text for images

## 🛠️ Maintenance

- Update sitemap.xml when adding new pages
- Keep JSON-LD event dates current
- Monitor Google Search Console for indexing issues
- Update meta descriptions for ongoing relevance
- Refresh Open Graph images periodically

## 📞 Support

For issues with:
- **SEO Configuration**: Review this document
- **Google Indexing API**: Check GitHub Action logs
- **Meta Tags**: Validate with tools listed above
- **Structured Data**: Use Google Rich Results Test

---

**Organization**: LeadLabs by Franz Badenhorst at SIG Solutions  
**Domain**: https://leadlabs.co.za  
**Last Updated**: October 31, 2025
