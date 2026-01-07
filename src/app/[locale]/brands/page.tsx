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
      <div className="container py-12">
        <FadeIn className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/5 rounded-2xl mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {t('nav.brands')}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our curated selection of premium international brands, bringing you the best in quality and style.
          </p>
        </FadeIn>

        <StaggeredList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 list-none p-0">
          {brands.map((brand) => (
            <StaggeredItem key={brand._id} className="list-none">
              <Link href={ROUTES.BRANDS.DETAILS(brand._id)} className="block group">
                <div className="flex flex-col items-center">
                  {/* Brand Logo Container */}
                  <div className="relative w-full aspect-square rounded-full bg-white dark:bg-zinc-900 border border-border/50 shadow-sm overflow-hidden flex items-center justify-center p-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/30 group-hover:-translate-y-2">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 10vw"
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Inner Glow Effect */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Brand Name */}
                  <div className="mt-4 text-center">
                    <h3 className="font-bold text-base transition-colors duration-300 group-hover:text-primary">
                      {brand.name}
                    </h3>
                    <div className="h-0.5 w-0 bg-primary mx-auto mt-1 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
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
