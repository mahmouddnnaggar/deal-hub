'use client';

/**
 * Skeleton Components for loading states
 */

import { cn } from '@/shared/lib';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

// Product card skeleton
function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden h-full flex flex-col">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-1/4 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
        <div className="mt-auto pt-4 border-t flex justify-between items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}

// Product grid skeleton
function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Category card skeleton
function CategoryCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <Skeleton className="h-24 w-24 mx-auto rounded-full" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
    </div>
  );
}

// Brand card skeleton
function BrandCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
  );
}

// Cart item skeleton
function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 border-b">
      <Skeleton className="h-20 w-20 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

// Product details skeleton
function ProductDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-20 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}

// Filter bar skeleton
function FilterBarSkeleton() {
  return (
    <div className="space-y-8 rounded-2xl border bg-card p-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-2/3" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full rounded-full" />
          <div className="flex justify-between">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

// Products page skeleton
function ProductsPageSkeleton() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-40 rounded-lg" />
        </div>

        {/* Layout Skeleton */}
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 shrink-0">
            <FilterBarSkeleton />
          </aside>
          <div className="flex-1">
            <ProductGridSkeleton count={9} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Table row skeleton
function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export {
  Skeleton,
  ProductCardSkeleton,
  ProductGridSkeleton,
  CategoryCardSkeleton,
  BrandCardSkeleton,
  CartItemSkeleton,
  ProductDetailsSkeleton,
  FilterBarSkeleton,
  ProductsPageSkeleton,
  TableRowSkeleton,
};
