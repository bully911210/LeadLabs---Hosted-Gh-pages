# GitHub Copilot Instructions for LeadLabs

## Project Overview

This is a React + Vite application for the LeadLabs™ webinar landing page, deployed to GitHub Pages at https://leadlabs.co.za.

**Tech Stack:**
- React 19.2.0 with TypeScript
- Vite 6.2.0 (build tool)
- TailwindCSS (inline utility classes)
- No additional CSS frameworks

## Project Structure

```
/
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── public/                 # Static assets (robots.txt, sitemap.xml)
├── dist/                   # Build output (auto-generated, not committed)
├── App.tsx                 # Main application component
├── index.tsx               # Entry point
├── index.html              # HTML template with SEO meta tags
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── metadata.json           # Application metadata
```

## Code Style and Conventions

### React and TypeScript

1. **Component Structure:**
   - Use functional components with TypeScript
   - Define prop interfaces using the `Props` suffix (e.g., `CtaButtonProps`)
   - Use `FC` (FunctionComponent) type for component definitions
   - Keep components small and focused on a single responsibility

2. **Hooks:**
   - Custom hooks should start with `use` prefix (e.g., `useIntersectionObserver`)
   - Place custom hooks at the top of the file before component definitions
   - Use `useMemo` and `useCallback` for performance optimization where appropriate
   - Use `useRef` for DOM references and mutable values

3. **State Management:**
   - Use `useState` for local component state
   - Keep state close to where it's used
   - Lift state up only when necessary for sharing between components

4. **TypeScript:**
   - Always define types for props, state, and return values
   - Use interfaces for object shapes
   - Avoid `any` type - use proper typing or `unknown` if necessary
   - Use type inference where TypeScript can infer the type

### Styling

1. **TailwindCSS:**
   - Use inline Tailwind utility classes for all styling
   - Follow the existing color scheme:
     - Primary: `#4C1D95` (purple)
     - Accent: `#FACC15` (yellow)
     - Dark: `#111827`
     - Gray: `#6B7280`
     - Background: `#FAFAFA`
   - Maintain responsive design with mobile-first approach
   - Use `sm:`, `md:`, `lg:` breakpoints consistently

2. **Component Styling:**
   - Keep className strings readable - break long ones into template literals if needed
   - Use consistent spacing (py-16 sm:py-24 for sections)
   - Maintain shadow and transition patterns already established

### Component Patterns

1. **Section Components:**
   - All major sections use the `Section` wrapper component
   - Sections include intersection observer for scroll animations
   - Max-width container: `max-w-[1200px]`
   - Padding: `py-16 sm:py-24 px-8`

2. **Button Components:**
   - Use the `CtaButton` component for primary call-to-action buttons
   - Maintain consistent hover effects: `-translate-y-1` and custom shadows
   - Focus states include ring with appropriate colors

3. **Reusable Patterns:**
   - Use the established card pattern: `bg-white p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)]`
   - Icon containers: `bg-[#FACC15] w-12 h-12 rounded-full flex items-center justify-center`

## Build and Deployment

### Development

```bash
npm install      # Install dependencies
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Deployment

- Automatic deployment to GitHub Pages via `.github/workflows/deploy.yml`
- Triggered on push to `main` branch
- Build output goes to `dist/` directory
- Custom domain: leadlabs.co.za

### Important Build Notes

- The build process includes a custom Vite plugin (`sitemapDatePlugin`) that updates sitemap dates
- Base path is `/` (configured in vite.config.ts)
- Build artifacts in `dist/` should not be committed to the repository

## SEO and Metadata

- All SEO configuration is documented in `SEO_CONFIGURATION.md`
- Meta tags are in `index.html` - preserve them when making changes
- Structured data (JSON-LD) is included for Organization and Event schemas
- Images must have descriptive alt text for accessibility and SEO
- Maintain robots.txt and sitemap.xml in `/public` directory

## Best Practices

### When Adding New Features

1. **Follow existing patterns:**
   - Use the same component structure as existing components
   - Maintain consistent TypeScript typing patterns
   - Follow the established styling approach

2. **Performance:**
   - Use intersection observer for scroll-triggered animations
   - Memoize expensive calculations with `useMemo`
   - Lazy load images if adding new heavy assets

3. **Accessibility:**
   - Include proper ARIA labels where needed
   - Ensure keyboard navigation works
   - Maintain semantic HTML structure
   - Include alt text for all images

4. **Testing:**
   - Test responsive design at mobile, tablet, and desktop sizes
   - Verify form submissions work correctly
   - Check that all CTAs and links function properly
   - Build the project to ensure no TypeScript errors

### Code Review Checklist

Before committing code:
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Code follows existing patterns and conventions
- [ ] All new images have descriptive alt text
- [ ] Responsive design works on mobile and desktop
- [ ] No hardcoded values that should be configurable
- [ ] SEO meta tags are preserved/updated appropriately
- [ ] Accessibility considerations are addressed

## Common Tasks

### Adding a New Section

```typescript
const NewSection: FC<{ scrollToForm: () => void }> = ({ scrollToForm }) => (
  <Section>
    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#111827]">
      Section Title
    </h2>
    {/* Section content */}
  </Section>
);
```

### Adding a Form Input

```typescript
<div>
  <label className="text-sm font-semibold text-gray-600 mb-1 block">Label</label>
  <input 
    type="text" 
    placeholder="Placeholder" 
    required 
    className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] transition" 
  />
</div>
```

### Adding Custom Hooks

- Place at top of App.tsx before components
- Follow the pattern of `useIntersectionObserver`
- Return values as const tuples when appropriate
- Clean up effects properly in return statement

## Dependencies

**Production:**
- react: ^19.2.0
- react-dom: ^19.2.0

**Development:**
- @types/node: ^22.14.0
- @vitejs/plugin-react: ^5.0.0
- typescript: ~5.8.2
- vite: ^6.2.0

**Note:** No linting tools are currently configured. Code style should follow the patterns established in App.tsx.

## Contact and Support

- **Organization**: LeadLabs™ by SIG Solutions
- **Founder**: Franz Badenhorst
- **Domain**: https://leadlabs.co.za
- **AI Studio**: https://ai.studio/apps/drive/1SBJlEJMhu9ukqgKZcvTI8f8g8CDkIi4O
