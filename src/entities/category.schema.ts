/**
 * Category Entity Schemas
 */

import { z } from 'zod';
import { createPaginatedResponseSchema, createSingleResponseSchema } from './api-response.schema';

// Category schema
export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;

// Categories list response
export const categoriesResponseSchema = createPaginatedResponseSchema(categorySchema);
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;

// Single category response
export const categoryResponseSchema = createSingleResponseSchema(categorySchema);
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;

// Subcategory schema
export const subcategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.union([z.string(), categorySchema]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Subcategory = z.infer<typeof subcategorySchema>;

// Subcategories list response
export const subcategoriesResponseSchema = z.object({
  results: z.number(),
  data: z.array(subcategorySchema),
});
export type SubcategoriesResponse = z.infer<typeof subcategoriesResponseSchema>;

// Category query params
export interface CategoriesQueryParams {
  limit?: number;
  page?: number;
  keyword?: string;
}
