/**
 * Address Entity Schemas
 */

import { z } from 'zod';

// Address schema
export const addressSchema = z.object({
  _id: z.string(),
  name: z.string(),
  details: z.string(),
  phone: z.string(),
  city: z.string(),
});

export type Address = z.infer<typeof addressSchema>;

// Addresses response
export const addressesResponseSchema = z.object({
  status: z.string(),
  data: z.array(addressSchema),
});

export type AddressesResponse = z.infer<typeof addressesResponseSchema>;

// Single address response
export const addressResponseSchema = z.object({
  status: z.string(),
  data: addressSchema,
});

export type AddressResponse = z.infer<typeof addressResponseSchema>;

// Add address request
export const addAddressRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  details: z.string().min(1, 'Address details are required'),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
  city: z.string().min(1, 'City is required'),
});

export type AddAddressRequest = z.infer<typeof addAddressRequestSchema>;
