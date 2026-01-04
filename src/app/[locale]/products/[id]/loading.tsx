import { ProductDetailsSkeleton } from '@/shared/ui';

export default function ProductDetailsLoading() {
  return (
    <div className="container py-8">
      <ProductDetailsSkeleton />
    </div>
  );
}
