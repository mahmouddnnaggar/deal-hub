import { setRequestLocale } from 'next-intl/server';
import { OrdersPageClient } from './orders-page-client';

interface OrdersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OrdersPageClient />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
