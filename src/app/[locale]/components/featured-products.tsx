'use client';

/**
 * Featured Products Section - Horizontal product carousel
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button } from '@/shared/ui';
import { ProductCard } from '@/features/products/components/product-card';
import { productsApi } from '@/features/products/api/products.api';
import type { Product } from '@/entities';
import { cn } from '@/shared/lib';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export function FeaturedProducts() {
  const t = useTranslations();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getProducts({ limit: 8, sort: '-ratingsAverage' });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-products-scroll');
    if (container) {
      const scrollAmount = 320;
      const newPosition =
        direction === 'left'
          ? Math.max(0, scrollPosition - scrollAmount)
          : scrollPosition + scrollAmount;

      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="min-w-[280px] h-[380px] bg-muted animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {t('home.featuredProducts')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('home.featuredProductsDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
            <Link href={ROUTES.PRODUCTS.LIST}>
              <Button variant="ghost" className="gap-1">
                {t('common.viewAll')}
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Products Scroll */}
        {/* Products Scroll Container with overflow padding for hover */}
        <div className="overflow-hidden -mx-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            id="featured-products-scroll"
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto pt-4 pb-4 px-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                className="w-[260px] md:w-[280px] flex-shrink-0"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
