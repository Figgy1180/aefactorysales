import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    answer: z.string(), // the one-paragraph direct answer shown first (AEO)
    published: z.string(),
    updated: z.string(),
    related: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});
export const collections = { guides };
