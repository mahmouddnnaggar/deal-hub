'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useCart } from '@/features/cart/context';
import { useWishlist } from '@/features/wishlist/context';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Button, Card } from '@/shared/ui';
import { formatPrice } from '@/shared/lib';

export function WishlistPageClient() {
  const t = useTranslations();
  const { addToCart } = useCart();
  const { items, removeFromWishlist, isLoading } = useWishlist();

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      _id: item._id,
      title: item.title,
      price: item.price,
      imageCover: item.imageCover,
      priceAfterDiscount: item.priceAfterDiscount,
    });
    removeFromWishlist(item._id);
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <FadeIn>
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('wishlist.empty')}</h1>
            <p className="text-muted-foreground mb-6">Save items you love for later</p>
            <Link href={ROUTES.PRODUCTS.LIST}>
              <Button>{t('cart.continueShopping')}</Button>
            </Link>
          </FadeIn>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold mb-8">{t('wishlist.title')}</h1>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <FadeIn key={item._id}>
              <Card className="overflow-hidden">
                <Link href={ROUTES.PRODUCTS.DETAILS(item._id)}>
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={ROUTES.PRODUCTS.DETAILS(item._id)}>
                    <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-primary mb-4">
                    {formatPrice(item.priceAfterDiscount || item.price)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleMoveToCart(item)}
                      disabled={isLoading}
                    >
                      <ShoppingCart className="w-4 h-4 me-2" />
                      {t('product.addToCart')}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => removeFromWishlist(item._id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
