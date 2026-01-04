import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { RegisterForm } from './register-form';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Skeleton } from '@/shared/ui';

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <FadeIn>
          <Suspense fallback={<Skeleton className="w-full max-w-md h-[600px] rounded-xl" />}>
            <RegisterForm />
          </Suspense>
        </FadeIn>
      </div>
    </PageTransition>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
