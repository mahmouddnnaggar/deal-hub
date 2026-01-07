import { setRequestLocale } from 'next-intl/server';
import {
  HeroSlider,
  FeaturedProducts,
  PromoBanners,
  CategoryShowcase,
} from './components';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  return (
    <main className="flex-1">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Promo Banners Section */}
      <PromoBanners />

      {/* Category Showcase Section */}
      <CategoryShowcase />
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
