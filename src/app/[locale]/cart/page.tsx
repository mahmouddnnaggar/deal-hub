import { setRequestLocale } from 'next-intl/server';
import { CartPageClient } from './cart-page-client';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CartPageClient />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
