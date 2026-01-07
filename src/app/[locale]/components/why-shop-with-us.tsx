'use client';

/**
 * Why Shop With Us Section - Premium features showcase
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BadgeCheck, Truck, Shield, Headphones, RefreshCw, Award } from 'lucide-react';
import { cn } from '@/shared/lib';

const features = [
  {
    icon: BadgeCheck,
    titleKey: 'home.qualityProducts',
    descKey: 'home.qualityProductsDesc',
    gradient: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Truck,
    titleKey: 'home.fastDelivery',
    descKey: 'home.fastDeliveryDesc',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Shield,
    titleKey: 'home.securePayment',
    descKey: 'home.securePaymentDesc',
    gradient: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function WhyShopWithUs() {
  const t = useTranslations();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full"
          >
            <Award className="w-4 h-4" />
            {t('home.whyShopWithUs')}
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('home.whyShopWithUs')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group"
              >
                <div
                  className={cn(
                    'relative p-8 rounded-2xl h-full',
                    'bg-card border transition-all duration-300',
                    'hover:shadow-2xl hover:border-primary/20',
                    'overflow-hidden'
                  )}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity',
                      feature.gradient
                    )}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center mb-6',
                      feature.bgColor
                    )}
                  >
                    <Icon className={cn('w-8 h-8', feature.iconColor)} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(feature.descKey)}
                  </p>

                  {/* Bottom gradient line */}
                  <div
                    className={cn(
                      'absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity',
                      feature.gradient
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '10K+', label: 'Products' },
            { value: '99%', label: 'Satisfaction Rate' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
