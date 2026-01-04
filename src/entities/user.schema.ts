/**
 * User Entity Schemas
 */

import { z } from 'zod';

// User schema
export const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  phone: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

// Auth request schemas
export const signupRequestSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rePassword: z.string(),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
}).refine((data) => data.password === data.rePassword, {
  message: 'Passwords do not match',
  path: ['rePassword'],
});

export type SignupRequest = z.infer<typeof signupRequestSchema>;

export const signinRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninRequest = z.infer<typeof signinRequestSchema>;

export const forgotPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;

export const verifyResetCodeRequestSchema = z.object({
  resetCode: z.string().min(1, 'Reset code is required'),
});

export type VerifyResetCodeRequest = z.infer<typeof verifyResetCodeRequestSchema>;

export const resetPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;

export const changePasswordRequestSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rePassword: z.string(),
}).refine((data) => data.password === data.rePassword, {
  message: 'Passwords do not match',
  path: ['rePassword'],
});

export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;

export const updateProfileRequestSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;
