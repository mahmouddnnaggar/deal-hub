import { setRequestLocale } from 'next-intl/server';
import { WishlistPageClient } from './wishlist-page-client';

interface WishlistPageProps {
  params: Promise<{ locale: string }>;
}

export default async function WishlistPage({ params }: WishlistPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WishlistPageClient />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
