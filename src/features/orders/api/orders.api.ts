/**
 * Orders API - All order-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type {
  OrdersResponse,
  CreateOrderRequest,
  CheckoutSessionResponse,
} from '@/entities';

export const ordersApi = {
  /**
   * Get all orders
   */
  async getAllOrders(): Promise<OrdersResponse> {
    return http.get<OrdersResponse>(API_ENDPOINTS.ORDERS.BASE);
  },

  /**
   * Get orders for a specific user
   */
  async getUserOrders(userId: string): Promise<OrdersResponse> {
    return http.get<OrdersResponse>(API_ENDPOINTS.ORDERS.USER_ORDERS(userId));
  },

  /**
   * Create a cash order
   */
  async createCashOrder(
    cartId: string,
    shippingAddress: CreateOrderRequest['shippingAddress'],
    token: string
  ): Promise<{ status: string; data: OrdersResponse[0] }> {
    return http.post<{ status: string; data: OrdersResponse[0] }>(
      API_ENDPOINTS.ORDERS.CREATE_CASH(cartId),
      { shippingAddress },
      { token }
    );
  },

  /**
   * Create a checkout session for online payment (Stripe)
   */
  async createCheckoutSession(
    cartId: string,
    shippingAddress: CreateOrderRequest['shippingAddress'],
    successUrl: string,
    token: string
  ): Promise<CheckoutSessionResponse> {
    return http.post<CheckoutSessionResponse>(
      `${API_ENDPOINTS.ORDERS.CHECKOUT_SESSION(cartId)}?url=${encodeURIComponent(successUrl)}`,
      { shippingAddress },
      { token }
    );
  },
};
