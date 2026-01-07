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
import { useCart } from '@/features/cart/context';
import { useWishlist } from '@/features/wishlist/context';

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
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discount = hasDiscount
    ? calculateDiscount(product.price, product.priceAfterDiscount!)
    : 0;
  const finalPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const allImages = [product.imageCover, ...product.images];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
        priceAfterDiscount: product.priceAfterDiscount,
      });
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageCover: product.imageCover,
      priceAfterDiscount: product.priceAfterDiscount,
    });
  };

  return (
    <PageTransition>

      <div className="container py-6 sm:py-12 pb-32 lg:pb-24 overflow-x-hidden">
        {/* Breadcrumb - Clean & Minimal */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-6 sm:mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-primary transition-colors flex-shrink-0">{t('nav.home')}</Link>
          <span className="text-border flex-shrink-0">/</span>
          <Link href={ROUTES.PRODUCTS.LIST} className="hover:text-primary transition-colors flex-shrink-0">{t('nav.products')}</Link>
          <span className="text-border flex-shrink-0">/</span>
          <span className="text-primary truncate max-w-[150px] sm:max-w-none">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
          {/* LEFT: Image Gallery (Col 6) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 min-w-0 overflow-hidden">
            <FadeIn direction="left">
              <div className="relative group">
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm">
                  <Image
                    src={allImages[selectedImage]}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    priority
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 start-4 flex flex-col gap-2">
                    {product.priceAfterDiscount !== undefined && product.priceAfterDiscount !== null && product.priceAfterDiscount > 0 && (
                      <span className="bg-destructive text-white text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">
                        {discount}% {t('product.discount')}
                      </span>
                    )}
                    {product.ratingsAverage >= 4.8 && (
                      <span className="bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Thumbnails */}
              <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-16 w-14 sm:h-20 sm:w-16 md:h-24 md:w-20 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 transform",
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
          <div className="lg:col-span-6 min-w-0 overflow-hidden">
            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24 max-w-full">
                <div className="space-y-3 sm:space-y-4">
                  <Link href={ROUTES.BRANDS.DETAILS(product.brand._id)} className="block w-fit">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary/80 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                      {product.brand.name}
                    </span>
                  </Link>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                    {product.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", s <= Math.round(product.ratingsAverage) ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30")} />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-bold ml-1">{formatRating(product.ratingsAverage)}</span>
                    </div>
                    <div className="h-3 sm:h-4 w-px bg-border" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {product.ratingsQuantity} {t('product.reviews')}
                    </span>
                  </div>
                </div>

                {/* Ultra Compact Action Card */}
                <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-muted/50 dark:bg-card border border-border overflow-hidden">
                  {/* Price Section */}
                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(finalPrice)}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-xs text-muted-foreground/60 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-destructive/10 text-destructive rounded-full">
                          -{discount}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Quantity & Stock Row - Horizontal on all sizes */}
                  <div className="flex items-center justify-between gap-2 py-2.5 border-y border-border/50 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">{t('product.quantity')}</span>
                      <div className="flex items-center bg-background rounded-md border border-border">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded-l-md transition-colors disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold border-x border-border">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                          disabled={quantity >= product.quantity}
                          className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded-r-md transition-colors disabled:opacity-30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-[10px] sm:text-xs font-semibold",
                      product.quantity > 0 ? "text-emerald-600" : "text-destructive"
                    )}>
                      <Check className="w-3 h-3" />
                      <span>{product.quantity > 0 ? `${product.quantity} in stock` : 'Out of Stock'}</span>
                    </div>
                  </div>

                  {/* Action Buttons - Compact */}
                  <div className="flex flex-col gap-1.5">
                    <Button 
                      type="button"
                      onClick={handleAddToCart}
                      disabled={product.quantity <= 0}
                      className="w-full h-9 sm:h-10 rounded-lg bg-primary text-primary-foreground font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                      {t('product.addToCart')}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handleToggleWishlist}
                      className={cn(
                        "w-full h-9 sm:h-10 rounded-lg font-semibold text-xs sm:text-sm transition-all",
                        inWishlist 
                          ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600" 
                          : "border-border hover:bg-muted"
                      )}
                    >
                      <Heart className={cn("w-3.5 h-3.5 mr-1.5", inWishlist && "fill-current")} />
                      {inWishlist ? 'Wishlisted' : 'Wishlist'}
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
          <div className="mt-12 sm:mt-20 lg:mt-32 pt-8 sm:pt-12 lg:pt-20 border-t border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Discover More</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">{t('product.relatedProducts')}</h2>
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
