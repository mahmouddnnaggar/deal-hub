import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { categoriesApi } from '@/features/categories/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { PageTransition, FadeIn, StaggeredList, StaggeredItem } from '@/shared/motion';
import { InteractiveCard, CardContent } from '@/shared/ui';

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const categoriesData = await categoriesApi.getCategories({ limit: 50 });

  return <CategoriesContent categories={categoriesData.data} />;
}

function CategoriesContent({ categories }: { categories: Array<{ _id: string; name: string; slug: string; image: string }> }) {
  const t = useTranslations();

  return (
    <PageTransition>
      <div className="container py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-8">{t('nav.categories')}</h1>
        </FadeIn>

        <StaggeredList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 list-none p-0">
          {categories.map((category) => (
            <StaggeredItem key={category._id} className="list-none">
              <Link href={ROUTES.CATEGORIES.DETAILS(category._id)}>
                <InteractiveCard className="group overflow-hidden text-center">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                      {category.name}
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
