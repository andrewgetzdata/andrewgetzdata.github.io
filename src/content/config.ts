import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    type: z.string().default(''),
    category: z.string().default(''),
    view_source: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'posts': postsCollection,
};
