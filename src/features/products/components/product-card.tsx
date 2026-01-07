'use client';

/**
 * Product Card Component with Add to Cart/Wishlist functionality
 */

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/entities';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useCart } from '@/features/cart/context';
import { useWishlist } from '@/features/wishlist/context';
import { InteractiveCard, CardContent, Button } from '@/shared/ui';
import { formatPrice, calculateDiscount, formatRating, cn } from '@/shared/lib';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product._id);
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discount = hasDiscount
    ? calculateDiscount(product.price, product.priceAfterDiscount!)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageCover: product.imageCover,
      priceAfterDiscount: product.priceAfterDiscount,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageCover: product.imageCover,
      priceAfterDiscount: product.priceAfterDiscount,
    });
  };

  return (
    <InteractiveCard className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
        <Link href={ROUTES.PRODUCTS.DETAILS(product._id)} className="w-full h-full block">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        
        {/* Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-2">
            {product.priceAfterDiscount !== undefined && product.priceAfterDiscount !== null && product.priceAfterDiscount > 0 && (
              <span className="bg-destructive/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-lg">
                {discount}% {t('product.discount')}
              </span>
            )}
            {product.ratingsAverage >= 4.8 && (
              <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
          </div>

          <button
            onClick={handleToggleWishlist}
            className={cn(
              'p-2.5 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-auto border border-white/20 shadow-xl',
              inWishlist 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/80 dark:bg-black/40 text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110'
            )}
            aria-label={t('product.addToWishlist')}
          >
            <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
          </button>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <Button 
            className="w-full bg-white text-black hover:bg-primary hover:text-white border-none shadow-xl rounded-xl py-6 group/btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-120" />
            <span className="font-semibold">{t('product.addToCart')}</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground/80">
            {product.category.name}
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[11px] font-bold">{formatRating(product.ratingsAverage)}</span>
          </div>
        </div>

        <Link href={ROUTES.PRODUCTS.DETAILS(product._id)} className="group/title inline-block">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-3 group-hover/title:text-primary transition-colors duration-300">
            {product.title}
          </h3>
        </Link>

        {/* Price & Rating Footer */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount ? (
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-extrabold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                  {formatPrice(product.priceAfterDiscount!)}
                </span>
                <span className="text-xs text-muted-foreground/60 line-through decoration-1">
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-extrabold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div className="text-[10px] font-medium text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-md">
            {product.ratingsQuantity} {t('product.reviews') || 'reviews'}
          </div>
        </div>
      </CardContent>
    </InteractiveCard>
  );
}

