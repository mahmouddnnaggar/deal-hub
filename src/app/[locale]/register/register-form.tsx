'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { signupRequestSchema, type SignupRequest } from '@/entities';
import { authApi } from '@/features/auth/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui';

export function RegisterForm() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupRequest>({
    resolver: zodResolver(signupRequestSchema),
  });

  const onSubmit = async (data: SignupRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.signup(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{t('auth.registerSuccess')}</h2>
          <p className="text-muted-foreground mb-6">You can now login to your account</p>
          <Link href={ROUTES.AUTH.LOGIN}><Button>{t('auth.login')}</Button></Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('auth.register')}</CardTitle>
        <CardDescription>Create your account to start shopping</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.name')}</label>
            <div className="relative">
              <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="John Doe" className="w-full h-10 ps-10 pe-3 rounded-lg border bg-background text-sm" {...register('name')} />
            </div>
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="you@example.com" className="w-full h-10 ps-10 pe-3 rounded-lg border bg-background text-sm" {...register('email')} />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.phone')}</label>
            <div className="relative">
              <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="tel" placeholder="+20 1234567890" className="w-full h-10 ps-10 pe-3 rounded-lg border bg-background text-sm" {...register('phone')} />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.password')}</label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full h-10 ps-10 pe-10 rounded-lg border bg-background text-sm" {...register('password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.confirmPassword')}</label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full h-10 ps-10 pe-3 rounded-lg border bg-background text-sm" {...register('rePassword')} />
            </div>
            {errors.rePassword && <p className="text-sm text-destructive">{errors.rePassword.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" isLoading={isLoading}>{t('auth.register')}</Button>
          <p className="text-sm text-muted-foreground text-center">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link href={ROUTES.AUTH.LOGIN} className="text-primary hover:underline">{t('auth.login')}</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
