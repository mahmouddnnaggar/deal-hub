import { setRequestLocale } from 'next-intl/server';
import { CheckoutPageClient } from './checkout-page-client';

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CheckoutPageClient />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
