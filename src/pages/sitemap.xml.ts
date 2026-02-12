import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  // Get all blog posts and projects
  const posts = await getCollection('blog');
  const projects = await getCollection('projects');

  // Static pages
  const staticPages = [
    '',
    'resume',
    'work',
  ];

  // Dynamic blog pages
  const blogPages = posts.map(post => `blog/${post.slug}`);

  // Dynamic project pages
  const projectPages = projects.map(project => `work/${project.slug}`);

  // Combine all pages
  const allPages = [...staticPages, ...blogPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => {
      const url = page ? `${site}${page}/` : site;
      const lastmod = new Date().toISOString().split('T')[0];

      // Set priority based on page type
      let priority = '0.5';
      if (page === '') priority = '1.0'; // Homepage
      else if (['resume'].includes(page)) priority = '0.8';
      else if (['work'].includes(page)) priority = '0.7';

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};