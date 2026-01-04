'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { 
  Package, ArrowLeft, Clock, CheckCircle, Truck, XCircle, 
  MapPin, CreditCard, Calendar 
} from 'lucide-react';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { useOrders, type Order } from '@/features/orders/context';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { formatPrice } from '@/shared/lib';

const statusConfig: Record<Order['status'], { icon: typeof Clock; color: string; bgColor: string; label: string }> = {
  pending: { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Pending' },
  processing: { icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Cancelled' },
};

interface OrderDetailsClientProps {
  orderId: string;
}

export function OrderDetailsClient({ orderId }: OrderDetailsClientProps) {
  const t = useTranslations();
  const { getOrder } = useOrders();
  
  const order = getOrder(orderId);

  if (!order) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <FadeIn>
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist</p>
            <Link href={ROUTES.ORDERS.LIST}>
              <Button>
                <ArrowLeft className="w-4 h-4 me-2" />
                Back to Orders
              </Button>
            </Link>
          </FadeIn>
        </div>
      </PageTransition>
    );
  }

  const StatusIcon = statusConfig[order.status].icon;
  const statusColor = statusConfig[order.status].color;
  const statusBgColor = statusConfig[order.status].bgColor;
  const statusLabel = statusConfig[order.status].label;
  
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <PageTransition>
      <div className="container py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link 
                href={ROUTES.ORDERS.LIST}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
              </Link>
              <h1 className="text-3xl font-bold">Order #{order._id.slice(-8).toUpperCase()}</h1>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusBgColor} ${statusColor}`}>
              <StatusIcon className="w-5 h-5" />
              <span className="font-medium">{statusLabel}</span>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Items ({order.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={ROUTES.PRODUCTS.DETAILS(item.productId)}>
                          <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quantity: {item.count}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Price per item: {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-end">
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(item.price * item.count)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>

            {/* Shipping Address */}
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium text-lg">{order.shippingAddress.name}</p>
                    <p className="text-muted-foreground mt-1">{order.shippingAddress.details}</p>
                    <p className="text-muted-foreground">{order.shippingAddress.city}</p>
                    <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle>{t('checkout.orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{orderDate}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">
                      {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit Card'}
                    </span>
                  </div>

                  <hr />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({order.items.length} items)</span>
                      <span>{formatPrice(order.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                  </div>

                  <hr />

                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('cart.total')}</span>
                    <span className="text-primary">{formatPrice(order.totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Order Timeline */}
            <FadeIn delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="w-0.5 h-full bg-border mt-2" />
                      </div>
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-sm text-muted-foreground">{orderDate}</p>
                      </div>
                    </div>
                    
                    {order.status !== 'pending' && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Package className="w-4 h-4 text-blue-600" />
                          </div>
                          {order.status !== 'processing' && <div className="w-0.5 h-full bg-border mt-2" />}
                        </div>
                        <div>
                          <p className="font-medium">Processing</p>
                          <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                        </div>
                      </div>
                    )}

                    {(order.status === 'shipped' || order.status === 'delivered') && (
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Truck className="w-4 h-4 text-purple-600" />
                          </div>
                          {order.status !== 'shipped' && <div className="w-0.5 h-full bg-border mt-2" />}
                        </div>
                        <div>
                          <p className="font-medium">Shipped</p>
                          <p className="text-sm text-muted-foreground">Your order is on the way</p>
                        </div>
                      </div>
                    )}

                    {order.status === 'delivered' && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Delivered</p>
                          <p className="text-sm text-muted-foreground">Order completed</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Actions */}
            <FadeIn delay={0.5}>
              <div className="space-y-2">
                <Link href={ROUTES.PRODUCTS.LIST} className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
