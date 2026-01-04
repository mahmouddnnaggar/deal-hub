'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Truck, MapPin, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/features/cart/context';
import { useOrders } from '@/features/orders/context';
import { Link, useRouter } from '@/i18n';
import { ROUTES } from '@/core/config';
import { PageTransition, FadeIn } from '@/shared/motion';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@/shared/ui';
import { formatPrice } from '@/shared/lib';

// Local schema for address
const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  city: z.string().min(1, 'City is required'),
  details: z.string().min(1, 'Address details are required'),
});

type AddressForm = z.infer<typeof addressSchema>;

interface SavedAddress extends AddressForm {
  _id: string;
}

export function CheckoutPageClient() {
  const t = useTranslations();
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  // Load addresses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('addresses');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAddresses(parsed);
        // Auto-select first address
        if (parsed.length > 0) {
          setSelectedAddress(parsed[0]._id);
        }
      } catch {
        // Invalid data
      }
    }
  }, []);

  // Save addresses to localStorage
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }
  }, [addresses]);

  const handleSaveAddress = (data: AddressForm) => {
    const newAddress: SavedAddress = {
      ...data,
      _id: `addr_${Date.now()}`,
    };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress._id);
    setShowAddressForm(false);
    reset();
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
    if (selectedAddress === addressId) {
      setSelectedAddress(addresses.length > 1 ? addresses[0]._id : null);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    const selectedAddr = addresses.find((addr) => addr._id === selectedAddress);
    if (!selectedAddr) {
      alert('Please select a valid shipping address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Create the order
      addOrder({
        items: items,
        totalPrice: totalPrice,
        shippingAddress: {
          name: selectedAddr.name,
          phone: selectedAddr.phone,
          city: selectedAddr.city,
          details: selectedAddr.details,
        },
        paymentMethod: paymentMethod,
      });

      // Clear the cart after successful order
      clearCart();

      // Redirect to orders page
      router.push(ROUTES.ORDERS.LIST);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <FadeIn>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
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
          <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {t('checkout.shippingAddress')}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setShowAddressForm(!showAddressForm)}>
                    <Plus className="w-4 h-4 me-1" /> Add New
                  </Button>
                </CardHeader>
                <CardContent>
                  {showAddressForm && (
                    <form onSubmit={handleSubmit(handleSaveAddress)} className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/30">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">{t('auth.name')}</label>
                          <input
                            className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="John Doe"
                            {...register('name')}
                          />
                          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t('checkout.phone')}</label>
                          <input 
                            className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
                            placeholder="+20 123 456 7890"
                            {...register('phone')} 
                          />
                          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">{t('checkout.city')}</label>
                        <input 
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
                          placeholder="Cairo"
                          {...register('city')} 
                        />
                        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium">{t('checkout.addressDetails')}</label>
                        <textarea 
                          rows={2} 
                          className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
                          placeholder="Street, Building, Floor, Apartment"
                          {...register('details')} 
                        />
                        {errors.details && <p className="text-sm text-destructive mt-1">{errors.details.message}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">Save Address</Button>
                        <Button type="button" variant="outline" onClick={() => { setShowAddressForm(false); reset(); }}>Cancel</Button>
                      </div>
                    </form>
                  )}

                  {addresses.length === 0 && !showAddressForm ? (
                    <p className="text-muted-foreground text-center py-4">No saved addresses. Add one above.</p>
                  ) : (
                    <div className="space-y-2">
                      {addresses.map((addr) => (
                        <div
                          key={addr._id}
                          className={`flex items-start justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedAddress === addr._id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                          }`}
                          onClick={() => setSelectedAddress(addr._id)}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="address"
                              value={addr._id}
                              checked={selectedAddress === addr._id}
                              onChange={() => setSelectedAddress(addr._id)}
                              className="mt-1"
                            />
                            <div>
                              <p className="font-medium">{addr.name}</p>
                              <p className="text-sm text-muted-foreground">{addr.details}, {addr.city}</p>
                              <p className="text-sm text-muted-foreground">{addr.phone}</p>
                            </div>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr._id); }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>

            {/* Payment Method */}
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {t('checkout.paymentMethod')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    <span>{t('checkout.cash')}</span>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span>{t('checkout.card')}</span>
                  </label>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Order Summary */}
          <div>
            <FadeIn delay={0.3}>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>{t('checkout.orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="line-clamp-1 flex-1">{item.product.title} x{item.count}</span>
                        <span className="font-medium">{formatPrice(item.price * item.count)}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('cart.total')}</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isLoading || !selectedAddress}
                  >
                    {isLoading ? 'Processing...' : t('checkout.placeOrder')}
                  </Button>
                  {!selectedAddress && addresses.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Please add a shipping address first
                    </p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
