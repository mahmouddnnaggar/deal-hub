import { setRequestLocale } from 'next-intl/server';
import { ProfilePageClient } from './profile-page-client';

// Force dynamic rendering for pages that use useSession
export const dynamic = 'force-dynamic';

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfilePageClient />;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
