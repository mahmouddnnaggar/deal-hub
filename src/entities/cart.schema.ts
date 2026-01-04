/**
 * Cart Entity Schemas
 */

import { z } from 'zod';

// Cart product reference
const cartProductSchema = z.object({
  _id: z.string(),
  title: z.string(),
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

// Cart item schema
export const cartItemSchema = z.object({
  _id: z.string(),
  count: z.number(),
  price: z.number(),
  product: cartProductSchema,
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Full cart schema
export const cartSchema = z.object({
  _id: z.string(),
  cartOwner: z.string(),
  products: z.array(cartItemSchema),
  totalCartPrice: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type Cart = z.infer<typeof cartSchema>;

// Cart response
export const cartResponseSchema = z.object({
  status: z.string(),
  numOfCartItems: z.number(),
  cartId: z.string().optional(),
  data: cartSchema,
});

export type CartResponse = z.infer<typeof cartResponseSchema>;

// Add to cart request
export const addToCartRequestSchema = z.object({
  productId: z.string(),
});

export type AddToCartRequest = z.infer<typeof addToCartRequestSchema>;

// Update cart item request
export const updateCartItemRequestSchema = z.object({
  count: z.number().min(1),
});

export type UpdateCartItemRequest = z.infer<typeof updateCartItemRequestSchema>;

// Cart operations result
export const cartOperationResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  numOfCartItems: z.number(),
  data: cartSchema,
});

export type CartOperationResponse = z.infer<typeof cartOperationResponseSchema>;
