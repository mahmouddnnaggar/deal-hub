'use client';

import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ShoppingCart, Heart, User, Sun, Moon, 
  Globe, ChevronDown, UserCircle, LogOut, Package
} from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useCart } from '@/features/cart/context';
import { useWishlist } from '@/features/wishlist/context';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib';
import { useSession, signOut } from 'next-auth/react';


export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { data: session, status } = useSession();
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;
  const isAuthenticated = status === 'authenticated' && !!session;

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  const navLinks = [
    { href: ROUTES.HOME, label: t('nav.home') },
    { href: ROUTES.PRODUCTS.LIST, label: t('nav.products') },
    { href: ROUTES.CATEGORIES.LIST, label: t('nav.categories') },
    { href: ROUTES.BRANDS.LIST, label: t('nav.brands') },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5' 
          : 'bg-background/95 backdrop-blur'
      )}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
      
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Image
              src="/logo.svg"
              alt="Deal Hub"
              width={36}
              height={36}
              className="rounded-lg"
            />
          </motion.div>
          <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Deal Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                pathname === link.href 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="gap-1 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{locale.toUpperCase()}</span>
              <ChevronDown className={cn(
                'w-3 h-3 transition-transform',
                langMenuOpen && 'rotate-180'
              )} />
            </Button>
            <AnimatePresence>
              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangMenuOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute end-0 top-full mt-2 z-50 min-w-[120px] rounded-xl border bg-popover/95 backdrop-blur-xl p-1.5 shadow-xl"
                  >
                    <button
                      onClick={() => handleLocaleChange('en')}
                      className={cn(
                        'w-full cursor-pointer px-3 py-2 text-sm rounded-lg text-start hover:bg-primary/10 transition-colors flex items-center gap-2',
                        locale === 'en' && 'bg-primary/10 text-primary font-medium'
                      )}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => handleLocaleChange('ar')}
                      className={cn(
                        'w-full cursor-pointer px-3 py-2 text-sm rounded-lg text-start hover:bg-primary/10 transition-colors flex items-center gap-2',
                        locale === 'ar' && 'bg-primary/10 text-primary font-medium'
                      )}
                    >
                      🇸🇦 العربية
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>



          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {mounted && (
                <motion.div
                  key={resolvedTheme}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Wishlist */}
          <Link 
            href={ROUTES.WISHLIST}
            className="relative p-2 rounded-lg hover:bg-pink-500/10 hover:text-pink-500 transition-colors cursor-pointer"
          >
            <Heart className="w-5 h-5" />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-medium"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Cart */}
          <Link 
            href={ROUTES.CART}
            className="relative p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Profile / Login */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              >
                <UserCircle className="w-5 h-5 text-primary" />
                <ChevronDown className={cn(
                  'w-3 h-3 transition-transform hidden sm:block',
                  userMenuOpen && 'rotate-180'
                )} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserMenuOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-0 top-full mt-2 z-50 min-w-[160px] rounded-xl border bg-popover/95 backdrop-blur-xl p-1.5 shadow-xl"
                    >
                      <Link
                        href={ROUTES.PROFILE.INDEX}
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full px-3 py-2 text-sm rounded-lg text-start hover:bg-primary/10 transition-colors flex items-center gap-2"
                      >
                        <UserCircle className="w-4 h-4" />
                        {t('nav.profile')}
                      </Link>
                      <Link
                        href={ROUTES.ORDERS.LIST}
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full px-3 py-2 text-sm rounded-lg text-start hover:bg-primary/10 transition-colors flex items-center gap-2"
                      >
                        <Package className="w-4 h-4" />
                        {t('nav.orders')}
                      </Link>
                      <hr className="my-1.5 border-border/50" />
                      <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer px-3 py-2 text-sm rounded-lg text-start hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link 
              href={ROUTES.AUTH.LOGIN}
              className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t bg-background/95 backdrop-blur-xl overflow-hidden px-4"
          >
            <nav className="py-6 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3',
                      pathname === link.href 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : 'hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <hr className="my-2 border-border/50" />
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={ROUTES.ORDERS.LIST}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted flex items-center gap-3"
                >
                  {t('nav.orders')}
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={ROUTES.PROFILE.INDEX}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted flex items-center gap-3"
                >
                  {t('nav.profile')}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
