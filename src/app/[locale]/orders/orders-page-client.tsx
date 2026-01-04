'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useOrders, type Order } from '@/features/orders/context';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Button, Card } from '@/shared/ui';
import { formatPrice } from '@/shared/lib';

const statusConfig: Record<Order['status'], { icon: typeof Clock; color: string; label: string }> = {
  pending: { icon: Clock, color: 'text-yellow-600', label: 'Pending' },
  processing: { icon: Package, color: 'text-blue-600', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'text-green-600', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-600', label: 'Cancelled' },
};

export function OrdersPageClient() {
  const t = useTranslations();
  const { orders, isLoading } = useOrders();

  if (orders.length === 0 && !isLoading) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <FadeIn>
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t('orders.empty')}</h1>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet</p>
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
          <h1 className="text-3xl font-bold mb-8">{t('orders.title')}</h1>
        </FadeIn>

        <div className="space-y-4">
          {orders.map((order, index) => {
            const StatusIcon = statusConfig[order.status].icon;
            const statusColor = statusConfig[order.status].color;
            const statusLabel = statusConfig[order.status].label;
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <FadeIn key={order._id} delay={index * 0.1}>
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order #{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground">{orderDate}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${statusColor}`}>
                      <StatusIcon className="w-5 h-5" />
                      <span className="font-medium">{statusLabel}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.count}</p>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(item.price * item.count)}</p>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        +{order.items.length - 3} more items
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit Card'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ship to: {order.shippingAddress.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-end">
                        <p className="text-sm text-muted-foreground">{t('cart.total')}</p>
                        <p className="text-lg font-bold text-primary">{formatPrice(order.totalPrice)}</p>
                      </div>
                      <Link href={`${ROUTES.ORDERS.LIST}/${order._id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                          <ChevronRight className="w-4 h-4 ms-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
