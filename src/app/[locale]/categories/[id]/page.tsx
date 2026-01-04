import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { categoriesApi } from '@/features/categories/api';
import { productsApi } from '@/features/products/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { PageTransition, FadeIn } from '@/shared/motion';
import { ProductGrid } from '@/features/products/components';
import { Button } from '@/shared/ui';

interface CategoryDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function CategoryDetailsPage({ params }: CategoryDetailsPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  try {
    // Fetch category details and products in parallel
    const [categoryData, productsData] = await Promise.all([
      categoriesApi.getCategory(id),
      productsApi.getProductsByCategory(id, { limit: 20 }),
    ]);

    return (
      <CategoryDetailsContent
        category={categoryData.data}
        products={productsData.data}
        totalProducts={productsData.results}
      />
    );
  } catch {
    notFound();
  }
}

function CategoryDetailsContent({
  category,
  products,
  totalProducts,
}: {
  category: { _id: string; name: string; slug: string; image: string };
  products: Array<any>;
  totalProducts: number;
}) {
  const t = useTranslations();

  return (
    <PageTransition>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <Link href={ROUTES.CATEGORIES.LIST} className="hover:text-foreground">
            {t('nav.categories')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Category Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-start">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-muted-foreground">
                {totalProducts} {t('nav.products')}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Products */}
        {products.length > 0 ? (
          <>
            <FadeIn delay={0.1}>
              <ProductGrid products={products} />
            </FadeIn>

            {totalProducts > 20 && (
              <FadeIn delay={0.2}>
                <div className="mt-8 text-center">
                  <Link href={`${ROUTES.PRODUCTS.LIST}?category=${category._id}`}>
                    <Button variant="outline" size="lg">
                      {t('common.viewAll')} ({totalProducts})
                    </Button>
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
