'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Sparkles,
  Check,
  Plus,
  Minus,
  Star,
  ShieldCheck,
  Zap,
  ArrowRight,
  Share2,
  Heart,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  PawPrint,
  Clock,
  Layers,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { calculateDiscount } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);

  const { addToCart, setIsCheckoutOpen } = useCart();
  const { formatPrice } = useCurrency();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copiedShare, setCopiedShare] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <h1 className="font-serif text-3xl font-medium text-espresso-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-xs text-espresso-600 mb-6">
            The digital template you are looking for does not exist or may have been renamed.
          </p>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full bg-espresso-900 text-cream-50 text-xs font-semibold"
          >
            Back to Tazvella Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.gallery.length > 0 ? product.gallery : [product.thumbnail];
  const discount = calculateDiscount(product.price, product.originalPrice);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-espresso-500 mb-8 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-espresso-900 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/#${product.category}`}
            className="hover:text-espresso-900 transition-colors capitalize"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight size={12} />
          <span className="text-espresso-900 font-medium truncate max-w-xs sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Main Product Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Viewport */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft-lg border border-cream-200 bg-cream-200">
              <Image
                src={images[activeImageIndex] || product.thumbnail}
                alt={product.title}
                fill
                priority
                className="object-cover transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Badges on top left */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                {product.badges.map((b, idx) => (
                  <Badge key={idx} text={b.text} variant={b.variant} />
                ))}
                {discount > 0 && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rosewood-500 text-cream-50 font-mono shadow-soft-sm">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-cream-50/90 backdrop-blur-md text-espresso-700 hover:text-espresso-950 transition-colors shadow-soft-sm border border-cream-200"
                title="Share this product"
              >
                {copiedShare ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-espresso-900 ring-2 ring-espresso-800/20 shadow-soft'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Device Compatibility Pills */}
            <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 flex flex-wrap items-center justify-between gap-3 text-xs text-espresso-700">
              <span className="font-semibold text-espresso-900">
                Compatible Tools:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.compatibility.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-full bg-cream-200/80 uppercase font-mono text-[10px] tracking-wider text-espresso-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Price, Buy Box, What's Included */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category tag */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-widest text-rosewood-700 font-semibold">
                  {product.categoryLabel}
                </span>
                {product.category === 'pets' && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-caramel-800 bg-caramel-100 px-2 py-0.5 rounded-full font-medium">
                    <PawPrint size={11} /> Pet Parent Collection
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950 leading-tight">
                {product.title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} showScore size={16} />
                <span className="text-xs text-espresso-500">
                  ({product.reviewsCount} verified reviews • {product.salesCount})
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-espresso-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                  Instant Access
                </span>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed font-light">
                {product.tagline}
              </p>

              {/* Long Description Paragraphs */}
              <div className="space-y-2 text-xs sm:text-sm text-espresso-600 leading-relaxed border-t border-cream-200 pt-4">
                {product.longDescription.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* What's Included Box */}
              <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200/90 shadow-soft-sm space-y-3">
                <h3 className="font-serif text-base font-semibold text-espresso-950 flex items-center gap-2">
                  <Sparkles size={15} className="text-rosewood-600" />
                  <span>What&apos;s Included in Your Download:</span>
                </h3>
                <ul className="space-y-2 text-xs text-espresso-700">
                  {product.whatsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-sage-600 mt-0.5 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky Buy Actions Area */}
            <div className="space-y-3 pt-4 border-t border-cream-200">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-cream-300 rounded-full bg-cream-50 px-3 py-2 gap-3 text-sm shadow-soft-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-espresso-600 hover:text-espresso-950"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-mono font-medium text-espresso-950 min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-espresso-600 hover:text-espresso-950"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 shadow-soft-lg"
                  onClick={handleAddToCart}
                >
                  <Plus size={16} />
                  <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                </Button>
              </div>

              {/* Instant Buy Now Button */}
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={handleBuyNow}
              >
                <span>Instant Checkout (Apple Pay / Card)</span>
                <ArrowRight size={14} />
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-espresso-500 pt-2">
                <span className="flex items-center gap-1">
                  <Zap size={12} className="text-caramel-500" />
                  Instant Email Delivery
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-sage-600" />
                  Lifetime Free Updates
                </span>
                <span>•</span>
                <span>Free Software Compatible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Deep Dive */}
        {product.features.length > 0 && (
          <div className="mt-8 pt-6 sm:mt-20 sm:pt-16 border-t border-cream-200">
            <div className="text-center max-w-xl mx-auto mb-5 sm:mb-10">
              <h2 className="font-serif text-xl sm:text-3xl font-medium text-espresso-950">
                Core Systems &amp; Features
              </h2>
              <p className="text-xs sm:text-sm text-espresso-600 mt-1">
                Thoughtfully crafted to make everyday planning an effortless pleasure.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
              {product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-cream-50 border border-cream-200 shadow-soft-sm space-y-1 sm:space-y-2"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-cream-200 flex items-center justify-center text-rosewood-700 font-bold mb-1.5 sm:mb-3">
                    <Sparkles size={14} className="sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="font-serif text-xs sm:text-base font-medium text-espresso-950 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-espresso-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section - 3 Columns */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-6 sm:mt-20 sm:pt-16 border-t border-cream-200">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-rosewood-700">
                  Complete Your Sanctuary
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-medium text-espresso-950">
                  You May Also Love
                </h3>
              </div>
              <Link
                href="/#catalog"
                className="text-xs font-semibold text-rosewood-700 hover:text-rosewood-900 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
