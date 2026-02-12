import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    author: z.string().default('Andrew Getz'),
    type: z.enum(['writing', 'work']).default('writing'),
    category: z.string().optional(),
    view_source: z.string().url().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
  }),
});

// Projects collection schema
const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    status: z.enum(['completed', 'in-progress', 'planned', 'archived']).default('completed'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    category: z.enum(['web-development', 'data-analysis', 'automation', 'content']),
    type: z.enum(['writing', 'work']).default('work'),
    view_source: z.string().url().optional(),
    client: z.string().optional(),
    url: z.string().url().optional(),
    github: z.string().url().optional(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
  }),
});

// Export collections
export const collections = {
  'blog': blogCollection,
  'projects': projectsCollection,
};