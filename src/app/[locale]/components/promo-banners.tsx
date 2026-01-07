'use client';

/**
 * Promo Banners Section - Glassmorphism promotional cards
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Percent, Gift, Truck } from 'lucide-react';
import { cn } from '@/shared/lib';

interface PromoBanner {
  id: number;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  link: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: 1,
    titleKey: 'home.promo.sale.title',
    descriptionKey: 'home.promo.sale.description',
    icon: <Percent className="w-8 h-8" />,
    gradient: 'from-rose-500/20 to-orange-500/20',
    glowColor: 'group-hover:shadow-rose-500/25',
    link: ROUTES.PRODUCTS.LIST,
  },
  {
    id: 2,
    titleKey: 'home.promo.newArrivals.title',
    descriptionKey: 'home.promo.newArrivals.description',
    icon: <Gift className="w-8 h-8" />,
    gradient: 'from-violet-500/20 to-purple-500/20',
    glowColor: 'group-hover:shadow-violet-500/25',
    link: ROUTES.PRODUCTS.LIST,
  },
  {
    id: 3,
    titleKey: 'home.promo.freeShipping.title',
    descriptionKey: 'home.promo.freeShipping.description',
    icon: <Truck className="w-8 h-8" />,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    glowColor: 'group-hover:shadow-emerald-500/25',
    link: ROUTES.PRODUCTS.LIST,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function PromoBanners() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {promoBanners.map((banner) => (
            <motion.div key={banner.id} variants={cardVariants}>
              <Link href={banner.link} className="block group">
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl p-6 md:p-8 h-full min-h-[200px]',
                    'bg-gradient-to-br backdrop-blur-xl',
                    'border border-white/10 dark:border-white/5',
                    'transition-all duration-500',
                    'shadow-lg hover:shadow-2xl',
                    banner.gradient,
                    banner.glowColor
                  )}
                >
                  {/* Background decoration */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex p-3 rounded-xl bg-background/50 backdrop-blur-sm mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {banner.icon}
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {t(banner.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {t(banner.descriptionKey)}
                    </p>

                    {/* Hover arrow */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-sm font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span>{t('common.viewAll')}</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Animated border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    whileHover={{
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
