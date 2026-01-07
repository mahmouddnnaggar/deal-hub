'use client';

/**
 * Category Showcase Section - Animated category cards
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { categoriesApi } from '@/features/categories/api/categories.api';
import type { Category } from '@/entities';
import { cn } from '@/shared/lib';
import { ArrowRight, Grid3X3, ShoppingBag } from 'lucide-react';
import { Button } from '@/shared/ui';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Fallback gradients for categories without images
const fallbackGradients = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-amber-500 to-orange-500',
  'from-cyan-500 to-blue-500',
];

export function CategoryShowcase() {
  const t = useTranslations();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getCategories({ limit: 8 });
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageError = (categoryId: string) => {
    setFailedImages((prev) => new Set(prev).add(categoryId));
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

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
              <Grid3X3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {t('home.shopByCategory')}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t('home.shopByCategoryDesc')}
              </p>
            </div>
          </div>
          <Link href={ROUTES.CATEGORIES.LIST}>
            <Button variant="ghost" className="gap-1">
              {t('common.viewAll')}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Button>
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {categories.map((category, index) => {
            const hasImageError = failedImages.has(category._id);
            const gradientClass = fallbackGradients[index % fallbackGradients.length];

            return (
              <motion.div key={category._id} variants={itemVariants}>
                <Link
                  href={ROUTES.CATEGORIES.DETAILS(category._id)}
                  className="block group"
                >
                  <div
                    className={cn(
                      'relative aspect-square overflow-hidden rounded-2xl',
                      'bg-card border transition-all duration-300',
                      'group-hover:shadow-xl group-hover:border-primary/20'
                    )}
                  >
                    {/* Image or Fallback */}
                    <div className="absolute inset-0">
                      {hasImageError ? (
                        // Fallback gradient with icon
                        <div
                          className={cn(
                            'absolute inset-0 bg-gradient-to-br flex items-center justify-center',
                            gradientClass
                          )}
                        >
                          <ShoppingBag className="w-16 h-16 text-white/50" />
                        </div>
                      ) : (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={() => handleImageError(category._id)}
                        />
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <motion.h3
                        className="text-white font-semibold text-lg md:text-xl"
                        initial={{ y: 0 }}
                        whileHover={{ y: -4 }}
                      >
                        {category.name}
                      </motion.h3>
                      <motion.span
                        className="text-white/70 text-sm flex items-center gap-1 mt-1"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {t('common.viewAll')}
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
