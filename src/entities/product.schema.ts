/**
 * Product Entity Schemas
 * Zod validation for product data
 */

import { z } from 'zod';
import { createPaginatedResponseSchema, createSingleResponseSchema } from './api-response.schema';


const productSubcategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
});


const productCategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
});


const productBrandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
});


export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  quantity: z.number(),
  sold: z.number(),
  price: z.number(),
  priceAfterDiscount: z.number().optional(),
  availableColors: z.array(z.string()).optional(),
  imageCover: z.string(),
  images: z.array(z.string()),
  category: productCategorySchema,
  subcategory: z.array(productSubcategorySchema),
  brand: productBrandSchema,
  ratingsAverage: z.number(),
  ratingsQuantity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
});

export type Product = z.infer<typeof productSchema>;


export const productsResponseSchema = createPaginatedResponseSchema(productSchema);
export type ProductsResponse = z.infer<typeof productsResponseSchema>;


export const productResponseSchema = createSingleResponseSchema(productSchema);
export type ProductResponse = z.infer<typeof productResponseSchema>;


export interface ProductsQueryParams {
  limit?: number;
  page?: number;
  sort?: string;
  fields?: string;
  'price[gte]'?: number;
  'price[lte]'?: number;
  keyword?: string;
  brand?: string;
  'category[in]'?: string;
}


export const PRODUCT_SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'createdAt', label: 'Oldest' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-ratingsAverage', label: 'Highest Rated' },
  { value: '-sold', label: 'Best Selling' },
  { value: 'title', label: 'Name: A-Z' },
  { value: '-title', label: 'Name: Z-A' },
] as const;
