/**
 * Products API - All products-related API calls
 * Full query parameter support for filtering, sorting, and pagination
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type { ProductsResponse, ProductResponse, ProductsQueryParams } from '@/entities';

/**
 * Build query string from params object
 */
function buildQueryString(params: ProductsQueryParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export const productsApi = {
  /**
   * Get all products with full query parameter support
   * Supports: limit, page, sort, fields, price[gte], price[lte], keyword, brand, category[in]
   */
  async getProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
    const queryString = buildQueryString(params);
    return http.get<ProductsResponse>(`${API_ENDPOINTS.PRODUCTS.LIST}${queryString}`);
  },

  /**
   * Get specific product by ID
   */
  async getProduct(id: string): Promise<ProductResponse> {
    return http.get<ProductResponse>(API_ENDPOINTS.PRODUCTS.DETAILS(id));
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(
    categoryId: string,
    params: Omit<ProductsQueryParams, 'category[in]'> = {}
  ): Promise<ProductsResponse> {
    return this.getProducts({ ...params, 'category[in]': categoryId });
  },

  /**
   * Get products by brand
   */
  async getProductsByBrand(
    brandId: string,
    params: Omit<ProductsQueryParams, 'brand'> = {}
  ): Promise<ProductsResponse> {
    return this.getProducts({ ...params, brand: brandId });
  },

  /**
   * Search products by keyword
   */
  async searchProducts(
    keyword: string,
    params: Omit<ProductsQueryParams, 'keyword'> = {}
  ): Promise<ProductsResponse> {
    return this.getProducts({ ...params, keyword });
  },

  /**
   * Get products within price range
   */
  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
    params: Omit<ProductsQueryParams, 'price[gte]' | 'price[lte]'> = {}
  ): Promise<ProductsResponse> {
    return this.getProducts({
      ...params,
      'price[gte]': minPrice,
      'price[lte]': maxPrice,
    });
  },
};
