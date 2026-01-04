import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { brandsApi } from '@/features/brands/api';
import { productsApi } from '@/features/products/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { PageTransition, FadeIn } from '@/shared/motion';
import { ProductGrid } from '@/features/products/components';
import { Button } from '@/shared/ui';

interface BrandDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function BrandDetailsPage({ params }: BrandDetailsPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  try {
    const [brandData, productsData] = await Promise.all([
      brandsApi.getBrand(id),
      productsApi.getProducts({ brand: id, limit: 20 }),
    ]);

    return (
      <BrandDetailsContent
        brand={brandData.data}
        products={productsData.data}
        totalProducts={productsData.results}
      />
    );
  } catch {
    notFound();
  }
}

function BrandDetailsContent({
  brand,
  products,
  totalProducts,
}: {
  brand: { _id: string; name: string; slug: string; image: string };
  products: Array<any>;
  totalProducts: number;
}) {
  const t = useTranslations();

  return (
    <PageTransition>
      <div className="container py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">{t('nav.home')}</Link>
          <span>/</span>
          <Link href={ROUTES.BRANDS.LIST} className="hover:text-foreground">{t('nav.brands')}</Link>
          <span>/</span>
          <span className="text-foreground">{brand.name}</span>
        </nav>

        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border">
            <div className="relative w-32 h-20 md:w-48 md:h-28 bg-white rounded-lg overflow-hidden p-4">
              <Image src={brand.image} alt={brand.name} fill sizes="192px" className="object-contain" />
            </div>
            <div className="text-center md:text-start">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{brand.name}</h1>
              <p className="text-muted-foreground">{totalProducts} {t('nav.products')}</p>
            </div>
          </div>
        </FadeIn>

        {products.length > 0 ? (
          <>
            <FadeIn delay={0.1}><ProductGrid products={products} /></FadeIn>
            {totalProducts > 20 && (
              <FadeIn delay={0.2}>
                <div className="mt-8 text-center">
                  <Link href={`${ROUTES.PRODUCTS.LIST}?brand=${brand._id}`}>
                    <Button variant="outline" size="lg">{t('common.viewAll')} ({totalProducts})</Button>
                  </Link>
                </div>
              </FadeIn>
            )}
          </>
        ) : (
          <FadeIn delay={0.1}>
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('product.noProducts')}</p>
            </div>
          </FadeIn>
        )}
      </div>
    </PageTransition>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
