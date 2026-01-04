/**
 * API endpoint definitions
 * All API endpoints are centralized here for type-safety and maintainability
 */

import { APP_CONSTANTS } from '@/core/config';

const API_VERSION = APP_CONSTANTS.API_VERSION;

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    SIGNUP: `/api/${API_VERSION}/auth/signup`,
    SIGNIN: `/api/${API_VERSION}/auth/signin`,
    FORGOT_PASSWORD: `/api/${API_VERSION}/auth/forgotPasswords`,
    VERIFY_RESET_CODE: `/api/${API_VERSION}/auth/verifyResetCode`,
    RESET_PASSWORD: `/api/${API_VERSION}/auth/resetPassword`,
    VERIFY_TOKEN: `/api/${API_VERSION}/auth/verifyToken`,
  },

  // Users
  USERS: {
    CHANGE_PASSWORD: `/api/${API_VERSION}/users/changeMyPassword`,
    UPDATE_ME: `/api/${API_VERSION}/users/updateMe`,
  },

  // Products
  PRODUCTS: {
    LIST: `/api/${API_VERSION}/products`,
    DETAILS: (id: string) => `/api/${API_VERSION}/products/${id}`,
  },

  // Categories
  CATEGORIES: {
    LIST: `/api/${API_VERSION}/categories`,
    DETAILS: (id: string) => `/api/${API_VERSION}/categories/${id}`,
    SUBCATEGORIES: (categoryId: string) =>
      `/api/${API_VERSION}/categories/${categoryId}/subcategories`,
  },

  // SubCategories
  SUBCATEGORIES: {
    LIST: `/api/${API_VERSION}/subcategories`,
    DETAILS: (id: string) => `/api/${API_VERSION}/subcategories/${id}`,
  },

  // Brands
  BRANDS: {
    LIST: `/api/${API_VERSION}/brands`,
    DETAILS: (id: string) => `/api/${API_VERSION}/brands/${id}`,
  },

  // Cart
  CART: {
    BASE: `/api/${API_VERSION}/cart`,
    ITEM: (id: string) => `/api/${API_VERSION}/cart/${id}`,
  },

  // Wishlist
  WISHLIST: {
    BASE: `/api/${API_VERSION}/wishlist`,
    ITEM: (id: string) => `/api/${API_VERSION}/wishlist/${id}`,
  },

  // Addresses
  ADDRESSES: {
    BASE: `/api/${API_VERSION}/addresses`,
    ITEM: (id: string) => `/api/${API_VERSION}/addresses/${id}`,
  },

  // Orders
  ORDERS: {
    BASE: `/api/${API_VERSION}/orders`,
    CREATE_CASH: (cartId: string) => `/api/${API_VERSION}/orders/${cartId}`,
    CHECKOUT_SESSION: (cartId: string) =>
      `/api/${API_VERSION}/orders/checkout-session/${cartId}`,
    USER_ORDERS: (userId: string) => `/api/${API_VERSION}/orders/user/${userId}`,
  },
} as const;
