/**
 * i18n Configuration
 */

import { getRequestConfig } from 'next-intl/server';
import { APP_CONSTANTS, type Locale } from '@/core/config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming locale is valid
  let locale = await requestLocale;

  if (!locale || !APP_CONSTANTS.LOCALES.includes(locale as Locale)) {
    locale = APP_CONSTANTS.DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
