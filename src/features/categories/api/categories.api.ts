/**
 * Categories API - All category-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type {
  CategoriesResponse,
  CategoryResponse,
  SubcategoriesResponse,
  CategoriesQueryParams,
} from '@/entities';

/**
 * Build query string from params object
 */
function buildQueryString(params: CategoriesQueryParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export const categoriesApi = {
  /**
   * Get all categories with pagination and search
   */
  async getCategories(params: CategoriesQueryParams = {}): Promise<CategoriesResponse> {
    const queryString = buildQueryString(params);
    return http.get<CategoriesResponse>(`${API_ENDPOINTS.CATEGORIES.LIST}${queryString}`);
  },

  /**
   * Get specific category by ID
   */
  async getCategory(id: string): Promise<CategoryResponse> {
    return http.get<CategoryResponse>(API_ENDPOINTS.CATEGORIES.DETAILS(id));
  },

  /**
   * Get all subcategories
   */
  async getSubcategories(limit?: number): Promise<SubcategoriesResponse> {
    const queryString = limit ? `?limit=${limit}` : '';
    return http.get<SubcategoriesResponse>(
      `${API_ENDPOINTS.SUBCATEGORIES.LIST}${queryString}`
    );
  },

  /**
   * Get specific subcategory by ID
   */
  async getSubcategory(id: string): Promise<{ data: SubcategoriesResponse['data'][0] }> {
    return http.get<{ data: SubcategoriesResponse['data'][0] }>(
      API_ENDPOINTS.SUBCATEGORIES.DETAILS(id)
    );
  },

  /**
   * Get subcategories for a specific category
   */
  async getCategorySubcategories(categoryId: string): Promise<SubcategoriesResponse> {
    return http.get<SubcategoriesResponse>(
      API_ENDPOINTS.CATEGORIES.SUBCATEGORIES(categoryId)
    );
  },
};
