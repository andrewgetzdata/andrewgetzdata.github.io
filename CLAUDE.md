# CLAUDE.md - Andrew Getz Portfolio Site

This document provides comprehensive guidance for Claude instances working on this Astro-based portfolio website.

## Project Overview

**Site**: Andrew Getz's personal portfolio and blog
**Framework**: Astro v5.17.1 with TypeScript
**Deployment**: GitHub Pages (via GitHub Actions)
**Domain**: andrewgetz.com
**Design System**: Vercel Geist design principles with black background aesthetic
**Content Management**: Astro Content Collections with Markdown files

## Quick Start Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start development server (localhost:4321)
npm run build           # Build for production
npm run preview         # Preview production build

# Content Management
# Add new post: Create .md file in src/content/posts/
# Update navigation: Edit src/layouts/BaseLayout.astro
```

## Site Architecture

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── ThemeToggle.astro    # Dark/light mode toggle
│   ├── SocialLinks.astro    # Social media links
│   └── Analytics.astro      # Privacy-focused analytics
├── content/            # Markdown content (managed by Astro collections)
│   ├── posts/              # All content (.md files) — writing and work
│   └── config.ts           # Content collection schema
├── layouts/            # Page layout templates
│   └── BaseLayout.astro     # Main layout with navigation, footer, SEO
├── pages/              # File-based routing
│   ├── index.astro              # Homepage
│   ├── resume.astro             # Resume page (print-friendly)
│   ├── work.astro               # Content listing page with filters
│   ├── content/[...slug].astro  # Dynamic content detail pages
│   └── sitemap.xml.ts           # SEO sitemap generation

public/
├── CNAME               # Custom domain (andrewgetz.com)
├── fonts.css           # Geist font definitions with CDN fallback
├── design-system.css   # Complete design system CSS
├── robots.txt          # SEO crawler guidance
└── fonts/              # Geist Pixel font files
```

### Content Collection Schema

All content lives in `src/content/posts/` with a unified schema:

```typescript
{
  title: string           # Post/project title
  description: string     # Meta description
  pubDate: Date          # Publication date
  tags: string[]         # Topic tags (used for filtering)
  featured: boolean      # Show in featured section on homepage
  type: string           # Content type (e.g. "writing", "work")
  category: string       # Category (e.g. "web-development", "blog")
  view_source: string    # Link to source code (optional, blank if none)
  draft: boolean         # Hide if true
}
```

All frontmatter properties should be present in every post in the same order. If a value doesn't apply, leave it as an empty string `""`.

## Design System (Geist Principles)

### Core Principles
- **Simplicity**: Remove unnecessary elements, focus on content
- **Minimalism**: Clean layouts with generous whitespace
- **Speed**: Optimized performance with static generation
- **Precision**: Consistent spacing, typography, and visual hierarchy
- **Clarity**: Clear navigation and content organization
- **High Contrast**: Accessible colors on black background

### Typography
- **Primary Font**: Geist Sans (UI and body text)
- **Monospace Font**: Geist Mono (code and technical content)
- **Display Font**: Geist Pixel (headings and brand)
- **Font Loading**: CDN primary, local fallback for performance
- **Scale**: Systematic type scale from `--text-xs` to `--text-6xl`

### Color System
```css
/* Dark theme (default) */
--bg-primary: #000000        /* Main background */
--bg-secondary: #0a0a0a      /* Card backgrounds */
--bg-tertiary: #161616       /* Input backgrounds */

--text-primary: #ffffff      /* Main text */
--text-secondary: #a1a1a1    /* Secondary text */
--text-tertiary: #737373     /* Muted text */

--accent-primary: #ffffff    /* Primary accent */
--accent-secondary: #0070f3  /* Links and highlights */

/* Light theme (toggle available) */
/* Auto-generated inverse colors via [data-theme="light"] */
```

### Spacing System
- **Base Unit**: `1rem = 16px`
- **Scale**: `--space-1` (0.25rem) to `--space-32` (8rem)
- **Consistent Application**: All margins, padding, gaps use space tokens

## Development Workflows

### Adding Content
1. Create new file: `src/content/posts/post-slug.md`
2. Add all frontmatter fields in the standard order (see schema above)
3. Write content in Markdown
4. Build and preview: `npm run build && npm run preview`
5. Commit and deploy

### Updating Navigation
- Edit `src/layouts/BaseLayout.astro`
- Ensure accessibility attributes are maintained

### Modifying Design System
- Edit `public/design-system.css` for global styles
- Use CSS custom properties for consistency
- Test both dark and light themes
- Verify mobile responsiveness

## SEO & Performance

### SEO Features
- **Structured Data**: JSON-LD schema for better search results
- **Meta Tags**: Comprehensive Open Graph and Twitter Card support
- **Sitemap**: Auto-generated XML sitemap at `/sitemap.xml`
- **Canonical URLs**: Proper canonical link handling
- **Robots.txt**: Crawler guidance in `/public/robots.txt`

### Performance Optimizations
- **Static Generation**: All pages pre-built at compile time
- **Font Optimization**: Preload critical fonts, CDN fallbacks
- **Minimal JavaScript**: Only essential interactive components
- **CSS Optimization**: Single CSS file, efficient selectors

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Deploys automatically on push to `main`.

### Environment Variables
```env
# Site configuration
SITE_URL=https://andrewgetz.com
```

## Content Guidelines
- **Voice**: Conversational but professional, avoid jargon
- **Length**: 800-2000 words for substantial posts
- **Code Examples**: Use proper syntax highlighting, explain context
- **Empty fields**: If a frontmatter field doesn't apply, leave it as `""`

## Troubleshooting

### Build Issues
- **URL Errors**: Check `Astro.site` configuration in `astro.config.mjs`
- **Content Errors**: Validate frontmatter against schema in `content/config.ts`
- **Type Errors**: Run `npm run build` to catch TypeScript issues

### Development Issues
- **Hot Reload**: Restart dev server if changes aren't reflected
- **Style Issues**: Check CSS custom property cascade and theme toggle
- **Content Not Showing**: Verify frontmatter and draft status

### Code Standards
- Use TypeScript for new components when possible
- Follow Astro conventions for component composition
- Maintain consistent naming conventions (kebab-case for files)
