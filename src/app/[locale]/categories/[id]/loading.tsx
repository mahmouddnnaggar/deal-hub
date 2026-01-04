import { ProductGridSkeleton, Skeleton } from '@/shared/ui';

export default function CategoryDetailsLoading() {
  return (
    <div className="container py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 rounded-xl border">
        <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
        <div className="text-center md:text-start">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      
      <ProductGridSkeleton count={8} />
    </div>
  );
}
