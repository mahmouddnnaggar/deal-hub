import { setRequestLocale } from 'next-intl/server';
import { OrderDetailsClient } from './order-details-client';

interface OrderDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <OrderDetailsClient orderId={id} />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
