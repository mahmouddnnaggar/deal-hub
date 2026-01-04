import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { APP_CONSTANTS } from '@/core/config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Deal Hub - Your Premium Shopping Destination',
    template: '%s | Deal Hub',
  },
  description: 'Discover amazing deals on electronics, fashion, and more at Deal Hub. Shop the best brands with fast delivery.',
  keywords: ['ecommerce', 'shopping', 'deals', 'electronics', 'fashion', 'online store'],
  authors: [{ name: 'Deal Hub' }],
  creator: 'Deal Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    siteName: 'Deal Hub',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
