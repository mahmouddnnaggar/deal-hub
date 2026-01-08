'use client';

/**
 * Hero Slider Component - Simple hero section with pagination
 */

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

function HeroSlideContent({ slide }: { slide: HeroSlide }) {
  const t = useTranslations();

  return (
    <div
      className={`relative h-[calc(100dvh-66px-60px)] flex items-center justify-center bg-gradient-to-br ${slide.gradient}`}
    >
      {/* Decorative elements - organic shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -start-1/5 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] opacity-50" />
        <div className="absolute -bottom-1/3 -end-1/5 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[80px] opacity-40" />
        <div className="absolute top-1/4 end-1/4 w-[200px] h-[200px] rounded-full bg-primary/3 blur-[60px] opacity-30" />
      </div>

      <div className="container px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1]">
          {t(slide.titleKey)}
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          {t(slide.descriptionKey)}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={slide.ctaLink}>
            <Button size="lg" className="gap-2 shadow-md shadow-primary/20 px-8">
              {t(slide.ctaKey)}
            </Button>
          </Link>
          <Link href={ROUTES.CATEGORIES.LIST}>
            <Button variant="outline" size="lg" className="px-6">
              {t('nav.categories')}
            </Button>
          </Link>
        </div>
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
