/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 40,
  
  // Cache durations (in seconds)
  CACHE_DURATION: {
    PRODUCTS: 60,
    CATEGORIES: 300,
    BRANDS: 300,
    STATIC: 3600,
  },
  
  // API versions
  API_VERSION: 'v1',
  
  // Local storage keys
  STORAGE_KEYS: {
    THEME: 'deal-hub-theme',
    LOCALE: 'deal-hub-locale',
    CART_ID: 'deal-hub-cart-id',
  },
  
  // Supported locales
  LOCALES: ['en', 'ar'] as const,
  DEFAULT_LOCALE: 'en' as const,
  
  // Currency
  CURRENCY: {
    CODE: 'EGP',
    SYMBOL: 'ج.م',
    LOCALE: 'ar-EG',
  },
} as const;

export type Locale = (typeof APP_CONSTANTS.LOCALES)[number];
