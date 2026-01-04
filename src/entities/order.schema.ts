/**
 * Order Entity Schemas
 */

import { z } from 'zod';

// Order item schema
const orderItemSchema = z.object({
  count: z.number(),
  price: z.number(),
  product: z.object({
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
  }),
  _id: z.string(),
});

// Shipping address in order
const shippingAddressSchema = z.object({
  details: z.string(),
  phone: z.string(),
  city: z.string(),
});

// User reference in order
const orderUserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

// Full order schema
export const orderSchema = z.object({
  _id: z.string(),
  user: orderUserSchema,
  cartItems: z.array(orderItemSchema),
  taxPrice: z.number(),
  shippingPrice: z.number(),
  shippingAddress: shippingAddressSchema,
  totalOrderPrice: z.number(),
  paymentMethodType: z.enum(['cash', 'card']),
  isPaid: z.boolean(),
  paidAt: z.string().optional(),
  isDelivered: z.boolean(),
  deliveredAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.number(),
});

export type Order = z.infer<typeof orderSchema>;

// Orders list response
export const ordersResponseSchema = z.array(orderSchema);
export type OrdersResponse = z.infer<typeof ordersResponseSchema>;

// Create order request (shipping address)
export const createOrderRequestSchema = z.object({
  shippingAddress: z.object({
    details: z.string().min(1, 'Address details are required'),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
    city: z.string().min(1, 'City is required'),
  }),
});

export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;

// Checkout session response
export const checkoutSessionResponseSchema = z.object({
  status: z.string(),
  session: z.object({
    url: z.string(),
  }),
});

export type CheckoutSessionResponse = z.infer<typeof checkoutSessionResponseSchema>;
