import { redirect } from 'next/navigation';
import { APP_CONSTANTS } from '@/core/config';

export default function RootPage() {
  // Redirect to default locale
  redirect(`/${APP_CONSTANTS.DEFAULT_LOCALE}`);
}
