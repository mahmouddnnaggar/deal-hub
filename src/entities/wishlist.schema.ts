/**
 * Wishlist Entity Schemas
 */

import { z } from 'zod';

// Wishlist item (product reference)
export const wishlistItemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  priceAfterDiscount: z.number().optional(),
  imageCover: z.string(),
  category: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  brand: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  ratingsAverage: z.number(),
  id: z.string(),
});

export type WishlistItem = z.infer<typeof wishlistItemSchema>;

// Wishlist response
export const wishlistResponseSchema = z.object({
  status: z.string(),
  count: z.number(),
  data: z.array(wishlistItemSchema),
});

export type WishlistResponse = z.infer<typeof wishlistResponseSchema>;

// Add to wishlist request
export const addToWishlistRequestSchema = z.object({
  productId: z.string(),
});

export type AddToWishlistRequest = z.infer<typeof addToWishlistRequestSchema>;

// Add to wishlist response
export const addToWishlistResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(z.string()), // Array of product IDs
});

export type AddToWishlistResponse = z.infer<typeof addToWishlistResponseSchema>;

// Remove from wishlist response
export const removeFromWishlistResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(z.string()),
});

export type RemoveFromWishlistResponse = z.infer<typeof removeFromWishlistResponseSchema>;
