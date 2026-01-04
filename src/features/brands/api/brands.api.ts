/**
 * Brands API - All brand-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type { BrandsResponse, BrandResponse, BrandsQueryParams } from '@/entities';

/**
 * Build query string from params object
 */
function buildQueryString(params: BrandsQueryParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export const brandsApi = {
  /**
   * Get all brands with optional limit and keyword search
   */
  async getBrands(params: BrandsQueryParams = {}): Promise<BrandsResponse> {
    const queryString = buildQueryString(params);
    return http.get<BrandsResponse>(`${API_ENDPOINTS.BRANDS.LIST}${queryString}`);
  },

  /**
   * Get specific brand by ID
   */
  async getBrand(id: string): Promise<BrandResponse> {
    return http.get<BrandResponse>(API_ENDPOINTS.BRANDS.DETAILS(id));
  },
};
