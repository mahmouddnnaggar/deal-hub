'use client';

/**
 * Register Form Component
 * Enhanced with modern styling and smooth interactions
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, User, Phone, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signupRequestSchema, type SignupRequest } from '@/entities';
import { authApi } from '@/features/auth/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button } from '@/shared/ui';
 
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

  // Success State
  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="relative bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
          {/* Decorative gradient accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500" />
          
          <div className="pt-10 pb-10 px-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100">
              {t('auth.registerSuccess')}
            </h2>
            <p className="text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
              {t('auth.registerSuccessDescription') || 'Your account has been created successfully. You can now login to access your account.'}
            </p>
            <Link href={ROUTES.AUTH.LOGIN} className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200">
              <Button className="h-12 px-8 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200">
                {t('auth.login')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <UserPlus className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('auth.register')}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('auth.registerDescription') || 'Create your account to start shopping'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8 space-y-4">
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t('auth.name')}
              </label>
              <div className="relative group">
                <User className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-12 ps-12 pe-4 rounded-xl border-2 border-border bg-background text-sm transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t('auth.email')}
              </label>
              <div className="relative group">
                <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
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

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t('auth.phone')}
              </label>
              <div className="relative group">
                <Phone className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type="tel"
                  placeholder="+20 1234567890"
                  className="w-full h-12 ps-12 pe-4 rounded-xl border-2 border-border bg-background text-sm transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50"
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t('auth.password')}
              </label>
              <div className="relative group">
                <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
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
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t('auth.confirmPassword')}
              </label>
              <div className="relative group">
                <Lock className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full h-12 ps-12 pe-4 rounded-xl border-2 border-border bg-background text-sm transition-all duration-200 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50"
                  {...register('rePassword')}
                />
              </div>
              {errors.rePassword && (
                <p className="text-sm text-destructive flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.rePassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pt-6 pb-8 space-y-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
              isLoading={isLoading}
            >
              {t('auth.register')}
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

            {/* Login Link */}
            <p className="text-sm text-muted-foreground text-center">
              {t('auth.alreadyHaveAccount')}{' '}
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-primary font-semibold hover:text-primary/80 transition-colors hover:underline underline-offset-4"
              >
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
