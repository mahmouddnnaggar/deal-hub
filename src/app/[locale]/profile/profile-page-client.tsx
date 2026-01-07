'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, MapPin, Lock, Plus, Trash2 } from 'lucide-react';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';

const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  city: z.string().min(1, 'City is required'),
  details: z.string().min(1, 'Address details are required'),
});

type AddressForm = z.infer<typeof addressSchema>;

export function ProfilePageClient() {
  const t = useTranslations();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'info' | 'addresses' | 'password'>('info');

  const tabs = [
    { id: 'info', label: t('profile.personalInfo'), icon: User },
    { id: 'addresses', label: t('profile.addresses'), icon: MapPin },
    { id: 'password', label: t('auth.changePassword'), icon: Lock },
  ] as const;

  return (
    <PageTransition>
      <div className="container py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>
        </FadeIn>

        <div className="grid lg:grid-cols-4 gap-8">
          <FadeIn delay={0.1}>
            <Card className="h-fit">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-start transition-colors ${
                        activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="lg:col-span-3">
            <FadeIn delay={0.2}>
              {activeTab === 'info' && <PersonalInfoTab session={session} t={t} />}
              {activeTab === 'addresses' && <AddressesTab t={t} />}
              {activeTab === 'password' && <PasswordTab t={t} />}
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function PersonalInfoTab({ session, t }: { session: any; t: any }) {
  return (
    <Card>
      <CardHeader><CardTitle>{t('profile.personalInfo')}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">{t('auth.name')}</label>
            <p className="text-lg">{session?.user?.name || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">{t('auth.email')}</label>
            <p className="text-lg">{session?.user?.email || 'Not set'}</p>
          </div>
        </div>
        <Button variant="outline">{t('profile.updateProfile')}</Button>
      </CardContent>
    </Card>
  );
}

function AddressesTab({ t }: { t: any }) {
  const [showForm, setShowForm] = useState(false);
  const [addresses] = useState<any[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressForm) => {
    setShowForm(false);
    reset();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('profile.addresses')}</CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 me-1" />{t('profile.addAddress')}
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6 p-4 border rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{t('auth.name')}</label>
                <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium">{t('checkout.phone')}</label>
                <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm" {...register('phone')} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">{t('checkout.city')}</label>
              <input className="w-full h-10 px-3 rounded-lg border bg-background text-sm" {...register('city')} />
            </div>
            <div>
              <label className="text-sm font-medium">{t('checkout.addressDetails')}</label>
              <textarea rows={3} className="w-full px-3 py-2 rounded-lg border bg-background text-sm" {...register('details')} />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save Address</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        )}
        {addresses.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">{t('profile.noAddresses')}</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address: any) => (
              <div key={address._id} className="flex items-start justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{address.name}</p>
                  <p className="text-sm text-muted-foreground">{address.details}, {address.city}</p>
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                </div>
                <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PasswordTab({ t }: { t: any }) {
  return (
    <Card>
      <CardHeader><CardTitle>{t('auth.changePassword')}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t('auth.currentPassword')}</label>
          <input type="password" className="w-full h-10 px-3 rounded-lg border bg-background text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">{t('auth.newPassword')}</label>
          <input type="password" className="w-full h-10 px-3 rounded-lg border bg-background text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">{t('auth.confirmPassword')}</label>
          <input type="password" className="w-full h-10 px-3 rounded-lg border bg-background text-sm" />
        </div>
        <Button>{t('auth.changePassword')}</Button>
      </CardContent>
    </Card>
  );
}
