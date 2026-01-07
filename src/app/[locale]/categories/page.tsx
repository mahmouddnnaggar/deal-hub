import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { categoriesApi } from '@/features/categories/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { PageTransition, FadeIn, StaggeredList, StaggeredItem } from '@/shared/motion';
import { InteractiveCard, CardContent } from '@/shared/ui';
import { ArrowRight } from 'lucide-react';

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
      <div className="container py-12">
        <FadeIn className="mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t('nav.categories')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t('home.shopByCategoryDesc') || 'Explore our wide range of categories and find exactly what you need.'}
            </p>
          </div>
        </FadeIn>

        <StaggeredList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 list-none p-0">
          {categories.map((category) => (
            <StaggeredItem key={category._id} className="list-none">
              <Link href={ROUTES.CATEGORIES.DETAILS(category._id)} className="block group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted border border-border/40 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                  />
                  
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-1.5 transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-white font-bold text-xl leading-tight">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-white/60 text-xs font-medium uppercase tracking-wider opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                          {t('common.viewAll')}
                        </span>
                        <div className="h-0.5 w-0 bg-primary group-hover:w-8 transition-all duration-500" />
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic Badge */}
                  <div className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                    <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
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
