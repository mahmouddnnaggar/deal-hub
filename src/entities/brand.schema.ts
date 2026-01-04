/**
 * Brand Entity Schemas
 */

import { z } from 'zod';
import { createPaginatedResponseSchema, createSingleResponseSchema } from './api-response.schema';

// Brand schema
export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Brand = z.infer<typeof brandSchema>;

// Brands list response
export const brandsResponseSchema = createPaginatedResponseSchema(brandSchema);
export type BrandsResponse = z.infer<typeof brandsResponseSchema>;

// Single brand response
export const brandResponseSchema = createSingleResponseSchema(brandSchema);
export type BrandResponse = z.infer<typeof brandResponseSchema>;

// Brand query params
export interface BrandsQueryParams {
  limit?: number;
  keyword?: string;
}
