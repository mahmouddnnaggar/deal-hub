import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button } from '@/shared/ui';
import { FadeIn } from '@/shared/motion';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container px-4 text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              {t('home.welcomeTo')}{' '}
              <span className="text-primary">Deal Hub</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('home.heroDescription')}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={ROUTES.PRODUCTS.LIST}>
                <Button size="lg">
                  {t('nav.products')}
                </Button>
              </Link>
              <Link href={ROUTES.CATEGORIES.LIST}>
                <Button variant="outline" size="lg">
                  {t('nav.categories')}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {t('home.whyShopWithUs')}
            </h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="text-center p-6 rounded-xl bg-card border">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{t('home.qualityProducts')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('home.qualityProductsDesc')}
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="text-center p-6 rounded-xl bg-card border">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{t('home.fastDelivery')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('home.fastDeliveryDesc')}
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="text-center p-6 rounded-xl bg-card border">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{t('home.securePayment')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('home.securePaymentDesc')}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
