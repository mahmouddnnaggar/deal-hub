/**
 * i18n Navigation utilities
 */

import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { APP_CONSTANTS } from '@/core/config';

export const routing = defineRouting({
  locales: APP_CONSTANTS.LOCALES,
  defaultLocale: APP_CONSTANTS.DEFAULT_LOCALE,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
