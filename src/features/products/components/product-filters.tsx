'use client';

/**
 * Product Filters Component
 */

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import type { Category, Brand } from '@/entities';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { cn } from '@/shared/lib';

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
  currentFilters: {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  onFilterChange: (filters: {
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  categories,
  brands,
  currentFilters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice?.toString() || '');

  const hasActiveFilters =
    currentFilters.category ||
    currentFilters.brand ||
    currentFilters.minPrice ||
    currentFilters.maxPrice;

  const handlePriceApply = () => {
    onFilterChange({
      category: currentFilters.category,
      brand: currentFilters.brand,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            {t('product.filters')}
          </span>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      <div
        className={cn(
          'lg:block',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{t('product.filters')}</CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 me-1" />
                {t('product.clearFilters')}
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-3">{t('product.category')}</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat._id}
                      checked={currentFilters.category === cat._id}
                      onChange={() =>
                        onFilterChange({ 
                          category: cat._id,
                          brand: currentFilters.brand,
                          minPrice: currentFilters.minPrice?.toString(),
                          maxPrice: currentFilters.maxPrice?.toString(),
                        })
                      }
                      className="accent-primary"
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="font-medium mb-3">{t('product.brand')}</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label
                    key={brand._id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="brand"
                      value={brand._id}
                      checked={currentFilters.brand === brand._id}
                      onChange={() =>
                        onFilterChange({ 
                          category: currentFilters.category,
                          brand: brand._id,
                          minPrice: currentFilters.minPrice?.toString(),
                          maxPrice: currentFilters.maxPrice?.toString(),
                        })
                      }
                      className="accent-primary"
                    />
                    <span className="text-sm">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium mb-3">{t('product.priceRange')}</h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="h-9"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="h-9"
                  />
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handlePriceApply}
                  className="w-full"
                >
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
