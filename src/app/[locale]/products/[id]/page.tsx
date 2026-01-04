import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { productsApi } from '@/features/products/api';
import { ProductDetailsClient } from './product-details-client';

interface ProductDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  try {
    // Fetch product data
    const productData = await productsApi.getProduct(id);
    
    // Fetch related products (same category)
    const relatedProducts = await productsApi.getProductsByCategory(
      productData.data.category._id,
      { limit: 8 }
    );

    // Filter out current product from related
    const filteredRelated = relatedProducts.data.filter(
      (p) => p._id !== productData.data._id
    ).slice(0, 4);

    return (
      <ProductDetailsClient
        product={productData.data}
        relatedProducts={filteredRelated}
      />
    );
  } catch {
    notFound();
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
