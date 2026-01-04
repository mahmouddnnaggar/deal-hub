/**
 * Wishlist API - All wishlist-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type {
  WishlistResponse,
  AddToWishlistResponse,
  RemoveFromWishlistResponse,
} from '@/entities';

export const wishlistApi = {
  /**
   * Get user's wishlist
   */
  async getWishlist(token: string): Promise<WishlistResponse> {
    return http.get<WishlistResponse>(API_ENDPOINTS.WISHLIST.BASE, { token });
  },

  /**
   * Add product to wishlist
   */
  async addToWishlist(productId: string, token: string): Promise<AddToWishlistResponse> {
    return http.post<AddToWishlistResponse>(
      API_ENDPOINTS.WISHLIST.BASE,
      { productId },
      { token }
    );
  },

  /**
   * Remove product from wishlist
   */
  async removeFromWishlist(
    productId: string,
    token: string
  ): Promise<RemoveFromWishlistResponse> {
    return http.delete<RemoveFromWishlistResponse>(
      API_ENDPOINTS.WISHLIST.ITEM(productId),
      { token }
    );
  },
};
