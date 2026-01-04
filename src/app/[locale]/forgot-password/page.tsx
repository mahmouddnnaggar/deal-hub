import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { ForgotPasswordForm } from './forgot-password-form';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Skeleton } from '@/shared/ui';

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <FadeIn>
          <Suspense fallback={<Skeleton className="w-full max-w-md h-96 rounded-xl" />}>
            <ForgotPasswordForm />
          </Suspense>
        </FadeIn>
      </div>
    </PageTransition>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
