'use client';

/**
 * Product Details Client Component
 * Full product information with images, description, add to cart/wishlist
 */

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Star, Minus, Plus, Check } from 'lucide-react';
import type { Product } from '@/entities';
import { Link } from '@/i18n';
import { ROUTES } from '@/core/config';
import { Button, Card } from '@/shared/ui';
import { ProductGrid } from '@/features/products/components';
import { PageTransition, FadeIn } from '@/shared/motion';
import { formatPrice, calculateDiscount, formatRating } from '@/shared/lib';

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

  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discount = hasDiscount
    ? calculateDiscount(product.price, product.priceAfterDiscount!)
    : 0;
  const finalPrice = hasDiscount ? product.priceAfterDiscount! : product.price;
  const allImages = [product.imageCover, ...product.images];

  return (
    <PageTransition>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <Link href={ROUTES.PRODUCTS.LIST} className="hover:text-foreground">
            {t('nav.products')}
          </Link>
          <span>/</span>
          <Link
            href={ROUTES.CATEGORIES.DETAILS(product.category._id)}
            className="hover:text-foreground"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <FadeIn direction="left">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <Image
                  src={allImages[selectedImage]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {hasDiscount && (
                  <span className="absolute top-4 start-4 bg-destructive text-destructive-foreground text-sm font-medium px-3 py-1.5 rounded-lg">
                    -{discount}% {t('product.discount')}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-6">
              {/* Brand */}
              <Link
                href={ROUTES.BRANDS.DETAILS(product.brand._id)}
                className="inline-block"
              >
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {product.brand.name}
                </span>
              </Link>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.ratingsAverage)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">
                  {formatRating(product.ratingsAverage)}
                </span>
                <span className="text-muted-foreground">
                  ({product.ratingsQuantity} {t('product.reviews')})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(finalPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.quantity > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">
                      {t('product.inStock')}
                    </span>
                    <span className="text-muted-foreground">
                      ({product.quantity} available)
                    </span>
                  </>
                ) : (
                  <span className="text-destructive font-medium">
                    {t('product.outOfStock')}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium">{t('product.quantity')}:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.quantity, quantity + 1))
                    }
                    className="p-2 hover:bg-muted transition-colors"
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart className="w-5 h-5 me-2" />
                  {t('product.addToCart')}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5 me-2" />
                  {t('product.addToWishlist')}
                </Button>
              </div>

              {/* Details Card */}
              <Card className="p-4">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t('product.category')}</dt>
                    <dd>
                      <Link
                        href={ROUTES.CATEGORIES.DETAILS(product.category._id)}
                        className="hover:text-primary"
                      >
                        {product.category.name}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t('product.brand')}</dt>
                    <dd>
                      <Link
                        href={ROUTES.BRANDS.DETAILS(product.brand._id)}
                        className="hover:text-primary"
                      >
                        {product.brand.name}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t('product.sold')}</dt>
                    <dd>{product.sold}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </FadeIn>
        </div>

        {/* Description */}
        <FadeIn delay={0.2}>
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">{t('product.description')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </FadeIn>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-6">
                {t('product.relatedProducts')}
              </h2>
              <ProductGrid products={relatedProducts} />
            </div>
          </FadeIn>
        )}
      </div>
    </PageTransition>
  );
}
