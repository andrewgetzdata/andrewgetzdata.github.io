import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts');

  const staticPages = [
    '',
    'resume',
    'work',
  ];

  const contentPages = posts.map(post => `content/${post.slug}`);

  const allPages = [...staticPages, ...contentPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(page => {
      const url = page ? `${site}${page}/` : site;
      const lastmod = new Date().toISOString().split('T')[0];

      let priority = '0.5';
      if (page === '') priority = '1.0';
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
