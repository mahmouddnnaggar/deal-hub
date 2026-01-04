'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useCart } from '@/features/cart/context';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Button, Card } from '@/shared/ui';
import { formatPrice } from '@/shared/lib';

export function CartPageClient() {
  const t = useTranslations();
  const { items, totalPrice, updateQuantity, removeFromCart, isLoading } = useCart();

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <FadeIn>
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('cart.empty')}</h1>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
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
          <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <FadeIn key={item.productId}>
                <Card className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={ROUTES.PRODUCTS.DETAILS(item.productId)}>
                        <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                          {item.product.title}
                        </h3>
                      </Link>
                      <p className="text-lg font-bold text-primary mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.count - 1)}
                            disabled={item.count <= 1 || isLoading}
                            className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.count}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.count + 1)}
                            disabled={isLoading}
                            className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          disabled={isLoading}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.1}>
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">{t('checkout.orderSummary')}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('cart.total')}</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <Link href={ROUTES.CHECKOUT}>
                  <Button className="w-full" size="lg">
                    {t('cart.checkout')}
                  </Button>
                </Link>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
