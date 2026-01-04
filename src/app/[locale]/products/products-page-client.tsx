'use client';

/**
 * Products Page Client Component
 * Handles filtering, sorting, and pagination with URL sync
 */

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import type { Product, Category, Brand } from '@/entities';
import { ProductGrid } from '@/features/products/components/product-grid';
import { ProductFilters } from '@/features/products/components/product-filters';
import { Pagination, PaginationInfo } from '@/shared/ui';
import { PageTransition } from '@/shared/motion';
import { PRODUCT_SORT_OPTIONS } from '@/entities';

interface ProductsPageClientProps {
  initialProducts: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
  categories: Category[];
  brands: Brand[];
  currentFilters: {
    sort?: string;
    category?: string;
    brand?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export function ProductsPageClient({
  initialProducts,
  pagination,
  categories,
  brands,
  currentFilters,
}: ProductsPageClientProps) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Update URL with new params
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filters change
      if (!('page' in updates)) {
        params.delete('page');
      }

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateParams({ page: page.toString() });
    },
    [updateParams]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      updateParams({ sort });
    },
    [updateParams]
  );

  const handleFilterChange = useCallback(
    (filters: {
      category?: string;
      brand?: string;
      minPrice?: string;
      maxPrice?: string;
    }) => {
      updateParams({
        category: filters.category,
        brand: filters.brand,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });
    },
    [updateParams]
  );

  const handleClearFilters = useCallback(() => {
    startTransition(() => {
      router.push('/products');
    });
  }, [router]);

  return (
    <PageTransition>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{t('nav.products')}</h1>
              <PaginationInfo
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.limit}
                className="mt-1"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                {t('product.sortBy')}:
              </label>
              <select
                id="sort"
                value={currentFilters.sort || '-createdAt'}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {PRODUCT_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <ProductFilters
                categories={categories}
                brands={brands}
                currentFilters={currentFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {isPending ? (
                <div className="opacity-50 pointer-events-none">
                  <ProductGrid products={initialProducts} />
                </div>
              ) : initialProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('product.noProducts')}</p>
                </div>
              ) : (
                <ProductGrid products={initialProducts} />
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
