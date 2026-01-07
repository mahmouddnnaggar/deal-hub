'use client';

/**
 * Product Details Client Component
 * Full product information with images, description, add to cart/wishlist
 */

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Star, Minus, Plus, Check, ArrowRight } from 'lucide-react';
import type { Product } from '@/entities';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button, Card } from '@/shared/ui';
import { ProductGrid } from '@/features/products/components';
import { PageTransition, FadeIn } from '@/shared/motion';
import { formatPrice, calculateDiscount, formatRating, cn } from '@/shared/lib';
import { motion } from 'framer-motion';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discount = hasDiscount
    ? calculateDiscount(product.price, product.priceAfterDiscount!)
    : 0;
  const finalPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const allImages = [product.imageCover, ...product.images];

  return (
    <PageTransition>

      <div className="container py-12 pb-32 lg:pb-24">
        {/* Breadcrumb - Clean & Minimal */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
          <span className="text-border">/</span>
          <Link href={ROUTES.PRODUCTS.LIST} className="hover:text-primary transition-colors">{t('nav.products')}</Link>
          <span className="text-border">/</span>
          <span className="text-primary truncate">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">
          {/* LEFT: Image Gallery (Col 7) */}
          <div className="lg:col-span-6 space-y-6">
            <FadeIn direction="left">
              <div className="relative group">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-muted border border-border/50 shadow-sm">
                  <Image
                    src={allImages[selectedImage]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    priority
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 start-6 flex flex-col gap-2">
                    {product.priceAfterDiscount !== undefined && product.priceAfterDiscount !== null && product.priceAfterDiscount > 0 && (
                      <span className="bg-destructive text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-xl">
                        {discount}% {t('product.discount')}
                      </span>
                    )}
                    {product.ratingsAverage >= 4.8 && (
                      <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Thumbnails */}
              <div className="flex gap-4 overflow-x-auto py-4 -mx-2 px-2 no-scrollbar">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-24 w-20 flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 transform",
                      selectedImage === index 
                        ? 'ring-2 ring-primary ring-offset-2 scale-105 shadow-lg' 
                        : 'opacity-50 hover:opacity-100 hover:scale-105 saturate-50 hover:saturate-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Product Info (Col 5) */}
          <div className="lg:col-span-6">
            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-8 sticky top-24">
                <div className="space-y-4">
                  <Link href={ROUTES.BRANDS.DETAILS(product.brand._id)} className="block w-fit">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/80 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                      {product.brand.name}
                    </span>
                  </Link>
                  <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("w-4 h-4", s <= Math.round(product.ratingsAverage) ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30")} />
                        ))}
                      </div>
                      <span className="text-sm font-bold ml-1">{formatRating(product.ratingsAverage)}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {product.ratingsQuantity} {t('product.reviews')}
                    </span>
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-muted/50 dark:bg-card border border-border space-y-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(finalPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xl text-muted-foreground/50 line-through font-medium">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 py-4 border-y border-border/50">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('product.quantity')}</span>
                    <div className="flex items-center bg-background rounded-xl border border-border p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        disabled={quantity >= product.quantity}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-lg transition-colors disabled:opacity-30"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className={cn("text-[10px] font-bold ml-auto uppercase tracking-tighter", product.quantity > 0 ? "text-emerald-500" : "text-destructive")}>
                      {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button size="lg" className="h-14 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t('product.addToCart')}
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 rounded-2xl border-2 font-black text-xs uppercase tracking-widest hover:bg-muted transition-all">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </div>

                {/* Tabs / Info Pills */}
                <div className="space-y-6">
                  <div className="flex gap-2 border-b border-border/50 pb-px">
                    {(['description', 'specs'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative px-4 py-2 text-[10px] uppercase font-black tracking-widest transition-all",
                          activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {tab}
                        {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[100px] text-sm leading-relaxed text-muted-foreground/80">
                    {activeTab === 'description' ? (
                      <p className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {product.description}
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Category</span>
                          <p className="text-foreground font-bold">{product.category.name}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Brand</span>
                          <p className="text-foreground font-bold">{product.brand.name}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Sold</span>
                          <p className="text-foreground font-bold">{product.sold} units</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">ID</span>
                          <p className="text-foreground font-bold truncate">{product._id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-border/50">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Discover More</span>
                <h2 className="text-4xl font-black">{t('product.relatedProducts')}</h2>
              </div>
              <Link href={ROUTES.CATEGORIES.DETAILS(product.category._id)}>
                <Button variant="ghost" className="font-bold text-xs uppercase tracking-widest group">
                  View Category 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </PageTransition>
  );
}
