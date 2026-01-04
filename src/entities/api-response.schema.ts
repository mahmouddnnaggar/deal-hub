/**
 * API Response Schemas
 * Generic API response wrappers with pagination metadata
 */

import { z } from 'zod';

// Pagination metadata from API
export const paginationMetadataSchema = z.object({
  currentPage: z.number(),
  limit: z.number(),
  numberOfPages: z.number(),
  nextPage: z.number().optional(),
  prevPage: z.number().optional(),
});

export type PaginationMetadata = z.infer<typeof paginationMetadataSchema>;

// Generic paginated response
export const createPaginatedResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    results: z.number(),
    metadata: paginationMetadataSchema,
    data: z.array(dataSchema),
  });

// Generic single item response
export const createSingleResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  });

// Auth response with token
export const authResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
  }),
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Success message response
export const messageResponseSchema = z.object({
  message: z.string(),
  statusMsg: z.string().optional(),
});

export type MessageResponse = z.infer<typeof messageResponseSchema>;

// Status response (for password reset etc.)
export const statusResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
});

export type StatusResponse = z.infer<typeof statusResponseSchema>;
