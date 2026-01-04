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
    <InteractiveCard className="group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <Link href={ROUTES.PRODUCTS.DETAILS(product._id)} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-2 start-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-md">
              -{discount}% {t('product.discount')}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              'absolute top-2 end-2 p-2 rounded-full transition-all',
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-background/90 backdrop-blur hover:bg-primary hover:text-primary-foreground'
            )}
            aria-label={t('product.addToWishlist')}
          >
            <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
          </button>
        </div>
      </Link>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col p-4">
        {/* Category */}
        <span className="text-xs text-muted-foreground mb-1">
          {product.category.name}
        </span>

        {/* Title */}
        <Link href={ROUTES.PRODUCTS.DETAILS(product._id)}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{formatRating(product.ratingsAverage)}</span>
          <span>({product.ratingsQuantity})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.priceAfterDiscount!)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <Button 
            size="icon" 
            variant="secondary" 
            aria-label={t('product.addToCart')}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </InteractiveCard>
  );
}
