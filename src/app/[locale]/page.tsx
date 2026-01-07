import { setRequestLocale } from 'next-intl/server';
import {
  HeroSlider,
  FeaturedProducts,
  PromoBanners,
  CategoryShowcase,
  BrandsMarquee,
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
      <HeroSlider />
      <BrandsMarquee />
      <FeaturedProducts />
      <PromoBanners />
      <CategoryShowcase />
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

