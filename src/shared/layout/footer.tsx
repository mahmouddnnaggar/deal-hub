'use client';

/**
 * Footer Component - Premium multi-column footer
 * Theme-aware design that matches the website's color scheme
 */

import { useTranslations } from 'next-intl';
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button, Input } from '@/shared/ui';

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 dark:bg-muted/10 border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-br from-primary/5 via-card to-purple-500/5 rounded-3xl p-8 md:p-12 border border-border shadow-sm">
            <div className="text-center lg:text-start space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Stay in the loop
              </h3>
              <p className="text-muted-foreground max-w-md">
                Get notified about new arrivals and exclusive offers. No spam, we promise.
              </p>
            </div>
            <div className="flex w-full lg:w-fit gap-2">
              <div className="relative flex-1 lg:w-80 group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Email address" 
                  className="pl-10 h-12 bg-background border-border rounded-xl focus:ring-primary/20"
                />
              </div>
              <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95">
                <Send className="w-4 h-4 mr-2" />
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">DEAL HUB</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Good products, fair prices. We bring together quality brands and deliver them to your door.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'Youtube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground tracking-tight">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href={ROUTES.PRODUCTS.LIST} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />{t('nav.products')}</Link></li>
              <li><Link href={ROUTES.CATEGORIES.LIST} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />{t('nav.categories')}</Link></li>
              <li><Link href={ROUTES.BRANDS.LIST} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />{t('nav.brands')}</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />{t('nav.home')}</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground tracking-tight">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />FAQs</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />Shipping Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />Return Policy</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground tracking-tight">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-muted p-2 rounded-lg border border-border">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm leading-snug text-muted-foreground">
                  123 Shopping Avenue, Digital City, <br />DC 45678, United States
                </span>
              </li>
              <li className="flex items-center gap-3 hover:text-foreground transition-colors cursor-pointer group">
                <div className="bg-muted p-2 rounded-lg border border-border group-hover:border-primary/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 hover:text-foreground transition-colors cursor-pointer group">
                <div className="bg-muted p-2 rounded-lg border border-border group-hover:border-primary/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">support@dealhub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-8 bg-muted/30">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-muted-foreground">
            &copy; {currentYear} <span className="text-foreground font-bold">DEAL HUB</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
          </div>
          {/* Payment Methods (Placeholder) */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-6 bg-muted border border-border rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
