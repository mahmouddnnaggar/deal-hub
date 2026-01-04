'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft } from 'lucide-react';
import { authApi } from '@/features/auth/api';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui';

const forgotPasswordSchema = z.object({ email: z.string().email('Invalid email address') });
const verifyCodeSchema = z.object({ resetCode: z.string().min(1, 'Code is required') });
const resetPasswordSchema = z.object({ email: z.string().email(), newPassword: z.string().min(6, 'Password must be at least 6 characters') });

type Step = 'email' | 'code' | 'password' | 'success';

export function ForgotPasswordForm() {
  const t = useTranslations();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm({ resolver: zodResolver(forgotPasswordSchema) });
  const codeForm = useForm({ resolver: zodResolver(verifyCodeSchema) });
  const passwordForm = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const handleEmailSubmit = async (data: { email: string }) => {
    setIsLoading(true); setError(null);
    try { await authApi.forgotPassword({ email: data.email }); setEmail(data.email); setStep('code'); } 
    catch (err: any) { setError(err.message || 'Failed to send reset code'); } 
    finally { setIsLoading(false); }
  };

  const handleCodeSubmit = async (data: { resetCode: string }) => {
    setIsLoading(true); setError(null);
    try { await authApi.verifyResetCode({ resetCode: data.resetCode }); setStep('password'); } 
    catch (err: any) { setError(err.message || 'Invalid reset code'); } 
    finally { setIsLoading(false); }
  };

  const handlePasswordSubmit = async (data: { newPassword: string }) => {
    setIsLoading(true); setError(null);
    try { await authApi.resetPassword({ email, newPassword: data.newPassword }); setStep('success'); } 
    catch (err: any) { setError(err.message || 'Failed to reset password'); } 
    finally { setIsLoading(false); }
  };

  if (step === 'success') {
    return (
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Password Reset!</h2>
          <p className="text-muted-foreground mb-6">Your password has been reset successfully</p>
          <Link href={ROUTES.AUTH.LOGIN}><Button>{t('auth.login')}</Button></Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('auth.resetPassword')}</CardTitle>
        <CardDescription>
          {step === 'email' && 'Enter your email to receive a reset code'}
          {step === 'code' && 'Enter the code sent to your email'}
          {step === 'password' && 'Enter your new password'}
        </CardDescription>
      </CardHeader>

      {step === 'email' && (
        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
          <CardContent className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="you@example.com" className="w-full h-10 ps-10 pe-3 rounded-lg border bg-background text-sm" {...emailForm.register('email')} />
              </div>
              {emailForm.formState.errors.email && <p className="text-sm text-destructive">{emailForm.formState.errors.email.message as string}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>Send Reset Code</Button>
            <Link href={ROUTES.AUTH.LOGIN} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </CardFooter>
        </form>
      )}

      {step === 'code' && (
        <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)}>
          <CardContent className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.verifyCode')}</label>
              <input type="text" placeholder="Enter 6-digit code" className="w-full h-10 px-3 rounded-lg border bg-background text-sm text-center tracking-widest" {...codeForm.register('resetCode')} />
              {codeForm.formState.errors.resetCode && <p className="text-sm text-destructive">{codeForm.formState.errors.resetCode.message as string}</p>}
            </div>
          </CardContent>
          <CardFooter><Button type="submit" className="w-full" isLoading={isLoading}>Verify Code</Button></CardFooter>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
          <CardContent className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.newPassword')}</label>
              <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg border bg-background text-sm" {...passwordForm.register('newPassword')} />
              {passwordForm.formState.errors.newPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message as string}</p>}
            </div>
          </CardContent>
          <CardFooter><Button type="submit" className="w-full" isLoading={isLoading}>{t('auth.resetPassword')}</Button></CardFooter>
        </form>
      )}
    </Card>
  );
}
