'use client';

/**
 * Mobile Navigation - Premium bottom bar for mobile users
 * Theme-aware design that matches the website's color scheme
 */

import { Home, Grid, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, usePathname } from '@/i18n';
import { ROUTES } from '@/core/config';
import { cn } from '@/shared/lib';
import { useCart } from '@/features/cart/context';

export function MobileNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const cartCount = items.length;

  const navItems = [
    { icon: Home, label: 'Home', href: ROUTES.HOME },
    { icon: Grid, label: 'Categories', href: ROUTES.CATEGORIES.LIST },
    { icon: ShoppingBag, label: 'Products', href: ROUTES.PRODUCTS.LIST },
    { icon: ShoppingCart, label: 'Cart', href: ROUTES.CART, badge: cartCount },
    { icon: User, label: 'Profile', href: ROUTES.PROFILE.INDEX },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-2 sm:px-4 pb-4 pointer-events-none">
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl flex items-center justify-between p-1 sm:p-1.5 pointer-events-auto"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center gap-0.5 py-1.5 sm:py-2 px-1.5 xs:px-2 sm:px-3 group flex-1"
            >
              <div className={cn(
                "p-2.5 rounded-xl transition-all duration-300 relative",
                isActive 
                  ? "text-primary-foreground bg-primary shadow-lg shadow-primary/30" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}>
                <item.icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center rounded-full font-black shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-tight transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
