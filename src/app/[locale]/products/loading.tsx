import { ProductGridSkeleton, ProductDetailsSkeleton } from '@/shared/ui';

export default function ProductsLoading() {
  return (
    <div className="container py-8">
      <ProductGridSkeleton />
    </div>
  );
}
