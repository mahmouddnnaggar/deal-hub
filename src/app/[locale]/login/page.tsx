import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { LoginForm } from '@/features/auth/components/login-form';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Skeleton } from '@/shared/ui';

// Force dynamic rendering for pages using useSearchParams
export const dynamic = 'force-dynamic';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <FadeIn>
          <Suspense fallback={<Skeleton className="w-full max-w-md h-96 rounded-xl" />}>
            <LoginForm />
          </Suspense>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
