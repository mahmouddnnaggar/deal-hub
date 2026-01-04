/**
 * Addresses API - All address-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type { AddressesResponse, AddressResponse, AddAddressRequest } from '@/entities';

export const addressesApi = {
  /**
   * Get all user addresses
   */
  async getAddresses(token: string): Promise<AddressesResponse> {
    return http.get<AddressesResponse>(API_ENDPOINTS.ADDRESSES.BASE, { token });
  },

  /**
   * Get specific address by ID
   */
  async getAddress(id: string, token: string): Promise<AddressResponse> {
    return http.get<AddressResponse>(API_ENDPOINTS.ADDRESSES.ITEM(id), { token });
  },

  /**
   * Add a new address
   */
  async addAddress(data: AddAddressRequest, token: string): Promise<AddressResponse> {
    return http.post<AddressResponse>(API_ENDPOINTS.ADDRESSES.BASE, data, { token });
  },

  /**
   * Remove an address
   */
  async removeAddress(id: string, token: string): Promise<{ message: string }> {
    return http.delete<{ message: string }>(API_ENDPOINTS.ADDRESSES.ITEM(id), { token });
  },
};
