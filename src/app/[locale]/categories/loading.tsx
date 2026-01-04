import { CategoryCardSkeleton } from '@/shared/ui';

export default function CategoriesLoading() {
  return (
    <div className="container py-8">
      <div className="h-8 w-48 bg-muted rounded animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
