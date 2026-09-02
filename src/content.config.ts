import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    series: z
      .object({
        id: z.string(), // ID matches the series entry (e.g. 'docker-mastery')
        order: z.number(), // 1-indexed chapter position
        title: z.string().optional(), // Display name of the series
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().default('BookOpen'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Intermediate'),
    estimatedHours: z.string().optional(),
    order: z.number().default(1),
  }),
});

export const collections = { blog, series };
