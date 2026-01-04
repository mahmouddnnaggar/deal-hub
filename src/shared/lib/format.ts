/**
 * Formatting utilities
 */

import { APP_CONSTANTS } from '@/core/config';

/**
 * Format price with currency
 */
export function formatPrice(
  price: number,
  locale: string = APP_CONSTANTS.CURRENCY.LOCALE
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: APP_CONSTANTS.CURRENCY.CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format date
 */
export function formatDate(
  date: string | Date,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj);
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date, locale: string = 'en-US'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return rtf.format(-diffMinutes, 'minute');
    }
    return rtf.format(-diffHours, 'hour');
  }

  if (diffDays < 7) {
    return rtf.format(-diffDays, 'day');
  }

  if (diffDays < 30) {
    return rtf.format(-Math.floor(diffDays / 7), 'week');
  }

  if (diffDays < 365) {
    return rtf.format(-Math.floor(diffDays / 30), 'month');
  }

  return rtf.format(-Math.floor(diffDays / 365), 'year');
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Generate product rating display
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
