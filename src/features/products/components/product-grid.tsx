'use client';

/**
 * Product Grid Component
 */

import type { Product } from '@/entities';
import { ProductCard } from './product-card';
import { StaggeredList, StaggeredItem } from '@/shared/motion';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <StaggeredList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 list-none p-0">
      {products.map((product) => (
        <StaggeredItem key={product._id} className="list-none">
          <ProductCard product={product} />
        </StaggeredItem>
      ))}
    </StaggeredList>
  );
}
