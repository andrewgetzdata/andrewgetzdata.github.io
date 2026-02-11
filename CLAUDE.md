# CLAUDE.md - Andrew Getz Portfolio Site

This document provides comprehensive guidance for Claude instances working on this Astro-based portfolio website.

## Project Overview

**Site**: Andrew Getz's personal portfolio and blog
**Framework**: Astro v5.17.1 with TypeScript
**Deployment**: Vercel (primary) / Netlify (configured)
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
# Add new blog post: Create .md file in src/content/blog/
# Add new project: Create .md file in src/content/projects/
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
│   ├── blog/              # Blog posts (.md files)
│   ├── projects/          # Project case studies (.md files)
│   └── config.ts          # Content collections schema
├── layouts/            # Page layout templates
│   └── BaseLayout.astro     # Main layout with navigation, footer, SEO
├── pages/              # File-based routing
│   ├── index.astro          # Homepage
│   ├── about.astro          # About page
│   ├── resume.astro         # Resume page (print-friendly)
│   ├── contact.astro        # Contact form (Netlify Forms)
│   ├── blog.astro           # Blog listing page
│   ├── work.astro           # Project showcase page
│   ├── blog/[...slug].astro # Dynamic blog post pages
│   ├── work/[...slug].astro # Dynamic project pages
│   └── sitemap.xml.ts       # SEO sitemap generation
├── styles/             # Moved to public/ for serving
└── utils/              # Utility functions (add as needed)

public/
├── fonts.css           # Geist font definitions with CDN fallback
├── design-system.css   # Complete design system CSS
├── robots.txt          # SEO crawler guidance
└── fonts/              # Local font files (if needed)
```

### Content Collections Schema

**Blog Posts** (`src/content/blog/`):
```typescript
{
  title: string           # Post title
  description: string     # Meta description
  pubDate: Date          # Publication date
  updatedDate?: Date     # Last updated (optional)
  tags: string[]         # Topic tags
  featured: boolean      # Show in featured section
  draft: boolean         # Hide if true
  author: string         # Default: "Andrew Getz"
  image?: {              # Social sharing image
    src: string
    alt: string
  }
}
```

**Projects** (`src/content/projects/`):
```typescript
{
  title: string              # Project name
  description: string        # Brief description
  startDate: Date           # Project start
  endDate?: Date           # Project completion (optional)
  status: 'completed' | 'in-progress' | 'planned' | 'archived'
  featured: boolean         # Show in featured section
  tags: string[]           # General tags
  technologies: string[]   # Tech stack used
  category: 'web-development' | 'data-analysis' | 'automation' | 'content'
  client?: string          # Client name (optional)
  url?: string            # Live project URL (optional)
  github?: string         # Repository URL (optional)
  image?: {...}           # Hero image (optional)
  gallery?: [{...}]       # Image gallery (optional)
}
```

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

### Adding Blog Posts
1. Create new file: `src/content/blog/post-slug.md`
2. Add frontmatter with required fields (title, description, pubDate)
3. Write content in Markdown
4. Build and preview: `npm run build && npm run preview`
5. Commit and deploy

### Adding Projects
1. Create new file: `src/content/projects/project-slug.md`
2. Add comprehensive frontmatter (see schema above)
3. Include detailed project description, implementation details, results
4. Add technologies, links, and metadata
5. Test build and commit

### Updating Navigation
- Edit `src/layouts/BaseLayout.astro`
- Update both desktop and mobile navigation arrays
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
- **Image Optimization**: Use Astro's built-in image optimization
- **Minimal JavaScript**: Only essential interactive components
- **CSS Optimization**: Single CSS file, efficient selectors

## Deployment

### Vercel (Recommended)
```bash
# Automatic deployment on push to main branch
# Environment variables:
PUBLIC_ANALYTICS_PROVIDER=vercel  # or 'plausible', 'google', 'none'
PUBLIC_ANALYTICS_ID=<your-id>     # if using analytics
```

### Netlify (Alternative)
- Configuration in `netlify.toml`
- Form handling enabled for contact form
- Security headers configured
- Build command: `npm run build`
- Publish directory: `dist`

### Environment Variables
```env
# Analytics (optional)
PUBLIC_ANALYTICS_PROVIDER=vercel|plausible|google|none
PUBLIC_ANALYTICS_ID=<analytics-id>

# Site configuration
SITE_URL=https://andrewgetz.dev
```

## Maintenance Tasks

### Regular Updates
- **Dependencies**: Review and update monthly with `npm update`
- **Content**: Add new blog posts and projects regularly
- **Performance**: Monitor Lighthouse scores and Core Web Vitals
- **Security**: Review dependencies for vulnerabilities

### Content Guidelines
- **Blog Posts**: Focus on development, data analysis, process insights
- **Voice**: Conversational but professional, avoid jargon
- **Length**: 800-2000 words for substantial posts
- **Code Examples**: Use proper syntax highlighting, explain context
- **Images**: Optimize for web, include descriptive alt text

### Common Customizations
- **Theme Colors**: Modify color tokens in `design-system.css`
- **Social Links**: Update URLs in `src/components/SocialLinks.astro`
- **Contact Form**: Add fields in `src/pages/contact.astro`
- **Analytics**: Switch providers in `src/components/Analytics.astro`

## Troubleshooting

### Build Issues
- **URL Errors**: Check `Astro.site` configuration in `astro.config.mjs`
- **Content Errors**: Validate frontmatter against schema in `content/config.ts`
- **Type Errors**: Run `npm run build` to catch TypeScript issues

### Development Issues
- **Hot Reload**: Restart dev server if changes aren't reflected
- **Style Issues**: Check CSS custom property cascade and theme toggle
- **Content Not Showing**: Verify frontmatter and draft status

### Performance Issues
- **Slow Builds**: Check for large images or excessive dependencies
- **Runtime Errors**: Review console for JavaScript errors
- **Layout Shifts**: Ensure proper image dimensions and font loading

## Future Enhancements

### Planned Features
- **Search Functionality**: Add full-text search for blog content
- **Newsletter Integration**: Email subscription for blog updates
- **Comments System**: Privacy-focused commenting (Giscus or similar)
- **RSS Feed**: Auto-generated RSS for blog subscribers
- **Portfolio Filtering**: Category-based project filtering

### Technical Improvements
- **Image Optimization**: Implement responsive images with `<picture>` elements
- **Offline Support**: Service worker for basic offline functionality
- **Micro-interactions**: Subtle animations following Geist principles
- **A/B Testing**: Framework for testing design variations

## Claude Usage Notes

### Content Creation
- When adding blog posts, maintain the established voice and style
- Focus on practical insights rather than theoretical discussions
- Include code examples where relevant, properly formatted
- Ensure all posts have appropriate tags for discoverability

### Design Modifications
- Always test both dark and light themes when making changes
- Maintain the systematic spacing and typography scales
- Verify mobile responsiveness for all changes
- Preserve accessibility features (ARIA labels, semantic HTML)

### Code Standards
- Use TypeScript for new components when possible
- Follow Astro conventions for component composition
- Maintain consistent naming conventions (kebab-case for files)
- Comment complex logic, especially in dynamic routes

This documentation should provide everything needed to maintain and extend the site effectively. Always test changes in development before deploying to production.