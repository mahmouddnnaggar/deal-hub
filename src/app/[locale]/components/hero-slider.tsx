'use client';

/**
 * Hero Slider Component - Premium animated hero section
 */

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button } from '@/shared/ui';
import { Slider } from '@/shared/motion/slider';

interface HeroSlide {
  id: number;
  titleKey: string;
  descriptionKey: string;
  ctaKey: string;
  ctaLink: string;
  gradient: string;
  accent: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: 'home.slider.slide1.title',
    descriptionKey: 'home.slider.slide1.description',
    ctaKey: 'home.slider.slide1.cta',
    ctaLink: ROUTES.PRODUCTS.LIST,
    gradient: 'from-primary/20 via-background to-secondary/20',
    accent: 'primary',
  },
  {
    id: 2,
    titleKey: 'home.slider.slide2.title',
    descriptionKey: 'home.slider.slide2.description',
    ctaKey: 'home.slider.slide2.cta',
    ctaLink: ROUTES.CATEGORIES.LIST,
    gradient: 'from-purple-500/20 via-background to-pink-500/20',
    accent: 'purple-500',
  },
  {
    id: 3,
    titleKey: 'home.slider.slide3.title',
    descriptionKey: 'home.slider.slide3.description',
    ctaKey: 'home.slider.slide3.cta',
    ctaLink: ROUTES.PRODUCTS.LIST,
    gradient: 'from-emerald-500/20 via-background to-cyan-500/20',
    accent: 'emerald-500',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

function HeroSlideContent({ slide }: { slide: HeroSlide }) {
  const t = useTranslations();

  return (
    <div
      className={`relative h-[calc(100vh-66px-60px)] flex items-center justify-center bg-gradient-to-br ${slide.gradient}`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -start-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -end-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container px-4 text-center relative z-10">
        <motion.span
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full"
        >
          Deal Hub
        </motion.span>

        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          {t(slide.titleKey)}
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          {t(slide.descriptionKey)}
        </motion.p>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href={slide.ctaLink}>
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
              {t(slide.ctaKey)}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </Link>
          <Link href={ROUTES.CATEGORIES.LIST}>
            <Button variant="outline" size="lg">
              {t('nav.categories')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function HeroSlider() {
  return (
    <Slider
      items={heroSlides}
      renderItem={(slide) => <HeroSlideContent slide={slide} />}
      autoPlay={true}
      autoPlayInterval={6000}
      showDots={true}
      showArrows={true}
      className="w-full"
    />
  );
}
