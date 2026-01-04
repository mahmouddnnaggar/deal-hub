/**
 * Application route definitions
 * Centralized route management for type-safety and consistency
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_CODE: '/verify-code',
  },
  
  // Product routes
  PRODUCTS: {
    LIST: '/products',
    DETAILS: (id: string) => `/products/${id}`,
  },
  
  // Category routes
  CATEGORIES: {
    LIST: '/categories',
    DETAILS: (id: string) => `/categories/${id}`,
  },
  
  // Brand routes
  BRANDS: {
    LIST: '/brands',
    DETAILS: (id: string) => `/brands/${id}`,
  },
  
  // Cart & Checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  
  // Wishlist
  WISHLIST: '/wishlist',
  
  // Orders
  ORDERS: {
    LIST: '/orders',
    DETAILS: (id: string) => `/orders/${id}`,
  },
  
  // Profile
  PROFILE: {
    INDEX: '/profile',
    ADDRESSES: '/profile/addresses',
    CHANGE_PASSWORD: '/profile/change-password',
  },
} as const;

// Protected routes that require authentication
// Only protect checkout and account-related pages
// Users can browse cart/wishlist but actions require login
export const PROTECTED_ROUTES = [
  ROUTES.CHECKOUT,
  ROUTES.ORDERS.LIST,
  ROUTES.PROFILE.INDEX,
  ROUTES.PROFILE.ADDRESSES,
  ROUTES.PROFILE.CHANGE_PASSWORD,
];

// Auth routes that should redirect authenticated users
export const AUTH_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
];
