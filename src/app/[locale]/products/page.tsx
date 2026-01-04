import { setRequestLocale } from 'next-intl/server';
import { productsApi } from '@/features/products/api';
import { categoriesApi } from '@/features/categories/api';
import { brandsApi } from '@/features/brands/api';
import { ProductsPageClient } from './products-page-client';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sort?: string;
    category?: string;
    brand?: string;
    keyword?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const search = await searchParams;
  setRequestLocale(locale);

  // Parse query params
  const page = parseInt(search.page || '1', 10);
  const limit = parseInt(search.limit || '12', 10);
  const sort = search.sort || '-createdAt';
  const category = search.category;
  const brand = search.brand;
  const keyword = search.keyword;
  const minPrice = search.minPrice ? parseInt(search.minPrice, 10) : undefined;
  const maxPrice = search.maxPrice ? parseInt(search.maxPrice, 10) : undefined;

  // Fetch data in parallel
  const [productsData, categoriesData, brandsData] = await Promise.all([
    productsApi.getProducts({
      page,
      limit,
      sort,
      'category[in]': category,
      brand,
      keyword,
      'price[gte]': minPrice,
      'price[lte]': maxPrice,
    }),
    categoriesApi.getCategories({ limit: 50 }),
    brandsApi.getBrands({ limit: 50 }),
  ]);

  return (
    <ProductsPageClient
      initialProducts={productsData.data}
      pagination={{
        currentPage: productsData.metadata.currentPage,
        totalPages: productsData.metadata.numberOfPages,
        totalItems: productsData.results,
        limit: productsData.metadata.limit,
      }}
      categories={categoriesData.data}
      brands={brandsData.data}
      currentFilters={{
        sort,
        category,
        brand,
        keyword,
        minPrice,
        maxPrice,
      }}
    />
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
