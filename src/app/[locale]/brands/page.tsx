import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { brandsApi } from '@/features/brands/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { PageTransition, FadeIn, StaggeredList, StaggeredItem } from '@/shared/motion';
import { InteractiveCard, CardContent } from '@/shared/ui';

interface BrandsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BrandsPage({ params }: BrandsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const brandsData = await brandsApi.getBrands({ limit: 50 });

  return <BrandsContent brands={brandsData.data} />;
}

function BrandsContent({ brands }: { brands: Array<{ _id: string; name: string; slug: string; image: string }> }) {
  const t = useTranslations();

  return (
    <PageTransition>
      <div className="container py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-8">{t('nav.brands')}</h1>
        </FadeIn>

        <StaggeredList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 list-none p-0">
          {brands.map((brand) => (
            <StaggeredItem key={brand._id} className="list-none">
              <Link href={ROUTES.BRANDS.DETAILS(brand._id)}>
                <InteractiveCard className="group overflow-hidden">
                  <div className="relative aspect-[3/2] overflow-hidden bg-white p-4">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                  </CardContent>
                </InteractiveCard>
              </Link>
            </StaggeredItem>
          ))}
        </StaggeredList>
      </div>
    </PageTransition>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
