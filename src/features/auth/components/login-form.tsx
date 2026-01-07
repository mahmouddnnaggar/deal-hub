'use client';

/**
 * Login Form Component
 * Enhanced with modern styling and smooth interactions
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { signinRequestSchema, type SigninRequest } from '@/entities';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button } from '@/shared/ui';

export function LoginForm() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninRequest>({
    resolver: zodResolver(signinRequestSchema),
  });

  const onSubmit = async (data: SigninRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card Container with enhanced styling */}
      <div className="relative bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
        {/* Decorative gradient accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
        
        {/* Header */}
        <div className="pt-8 pb-6 px-8 text-center">
          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <LogIn className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('auth.login')}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('auth.loginDescription') || 'Enter your credentials to access your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8 space-y-5">
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                {t('auth.email')}
              </label>
              <div className="relative group">
                <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full h-12 ps-12 pe-4 rounded-xl border-2 border-border bg-background text-sm transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                {t('auth.password')}
              </label>
              <div className="relative group">
                <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full h-12 ps-12 pe-12 rounded-xl border-2 border-border bg-background text-sm transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href={ROUTES.AUTH.FORGOT_PASSWORD}
                className="text-sm text-primary font-medium hover:text-primary/80 transition-colors hover:underline underline-offset-4"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pt-6 pb-8 space-y-4">
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200" 
              isLoading={isLoading}
            >
              {t('auth.login')}
            </Button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">
                  {t('auth.or') || 'or'}
                </span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-sm text-muted-foreground text-center">
              {t('auth.dontHaveAccount')}{' '}
              <Link 
                href={ROUTES.AUTH.REGISTER} 
                className="text-primary font-semibold hover:text-primary/80 transition-colors hover:underline underline-offset-4"
              >
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
