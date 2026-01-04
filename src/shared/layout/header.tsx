'use client';

import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Menu, X, ShoppingCart, Heart, User, Sun, Moon, 
  Globe, ChevronDown, Search 
} from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useCart } from '@/features/cart/context';
import { useWishlist } from '@/features/wishlist/context';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { href: ROUTES.HOME, label: t('nav.home') },
    { href: ROUTES.PRODUCTS.LIST, label: t('nav.products') },
    { href: ROUTES.CATEGORIES.LIST, label: t('nav.categories') },
    { href: ROUTES.BRANDS.LIST, label: t('nav.brands') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Deal Hub"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Deal Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button - Desktop */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="w-5 h-5" />
          </Button>

          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{locale.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangMenuOpen(false)} 
                />
                <div className="absolute end-0 top-full mt-1 z-50 min-w-[100px] rounded-md border bg-popover p-1 shadow-lg">
                  <button
                    onClick={() => handleLocaleChange('en')}
                    className={cn(
                      'w-full px-3 py-2 text-sm rounded-md text-start hover:bg-muted transition-colors',
                      locale === 'en' && 'bg-muted font-medium'
                    )}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLocaleChange('ar')}
                    className={cn(
                      'w-full px-3 py-2 text-sm rounded-md text-start hover:bg-muted transition-colors',
                      locale === 'ar' && 'bg-muted font-medium'
                    )}
                  >
                    العربية
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {mounted && (
              resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )
            )}
          </Button>

          {/* Wishlist */}
          <Link href={ROUTES.WISHLIST}>
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Cart */}
          <Link href={ROUTES.CART}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Profile / Login */}
          <Link href={ROUTES.AUTH.LOGIN}>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href={ROUTES.ORDERS.LIST}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted"
            >
              {t('nav.orders')}
            </Link>
            <Link
              href={ROUTES.PROFILE.INDEX}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted"
            >
              {t('nav.profile')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
