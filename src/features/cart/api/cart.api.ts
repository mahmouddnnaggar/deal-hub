/**
 * Cart API - All cart-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type { CartResponse, CartOperationResponse } from '@/entities';

export const cartApi = {
  /**
   * Get logged user's cart
   */
  async getCart(token: string): Promise<CartResponse> {
    return http.get<CartResponse>(API_ENDPOINTS.CART.BASE, { token });
  },

  /**
   * Add product to cart
   */
  async addToCart(productId: string, token: string): Promise<CartOperationResponse> {
    return http.post<CartOperationResponse>(
      API_ENDPOINTS.CART.BASE,
      { productId },
      { token }
    );
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(
    itemId: string,
    count: number,
    token: string
  ): Promise<CartOperationResponse> {
    return http.put<CartOperationResponse>(
      API_ENDPOINTS.CART.ITEM(itemId),
      { count },
      { token }
    );
  },

  /**
   * Remove item from cart
   */
  async removeCartItem(itemId: string, token: string): Promise<CartOperationResponse> {
    return http.delete<CartOperationResponse>(API_ENDPOINTS.CART.ITEM(itemId), { token });
  },

  /**
   * Clear entire cart
   */
  async clearCart(token: string): Promise<{ message: string }> {
    return http.delete<{ message: string }>(API_ENDPOINTS.CART.BASE, { token });
  },
};
