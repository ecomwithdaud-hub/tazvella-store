'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Star,
  Check,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const images = product.gallery.length > 0 ? product.gallery : [product.thumbnail];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-espresso-950/70 backdrop-blur-sm transition-opacity"
          onClick={() => setQuickViewProduct(null)}
        />

        {/* Modal Dialog */}
        <div className="relative transform overflow-hidden rounded-3xl bg-cream-50 text-left shadow-soft-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-cream-200">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-cream-100/90 hover:bg-cream-200 text-espresso-700 transition-colors shadow-soft-sm"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Showcase */}
            <div className="p-6 md:p-8 bg-cream-100/70 border-b md:border-b-0 md:border-r border-cream-200 flex flex-col justify-between">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200 shadow-soft-sm">
                <Image
                  src={images[activeImageIndex] || product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-espresso-900 ring-2 ring-espresso-800/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Trust row */}
              <div className="mt-6 pt-4 border-t border-cream-200/80 flex items-center justify-around text-xs text-espresso-600">
                <span className="flex items-center gap-1">
                  <Zap size={13} className="text-caramel-500" />
                  Instant Access
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-sage-600" />
                  Lifetime Updates
                </span>
                <span>•</span>
                <span>1-Click Duplication</span>
              </div>
            </div>

            {/* Right Product Summary & Actions */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {product.badges.map((b, i) => (
                    <Badge key={i} text={b.text} variant={b.variant} />
                  ))}
                  <span className="text-xs uppercase tracking-wider font-semibold text-espresso-400">
                    {product.categoryLabel}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl font-medium text-espresso-950 leading-tight">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={product.rating} showScore size={14} />
                  <span className="text-xs text-espresso-500">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-serif text-3xl font-bold text-espresso-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-espresso-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Instant Digital Delivery
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-espresso-600 mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* What's Included Preview (3 items) */}
                <div className="mt-5 space-y-2 bg-cream-100/60 p-4 rounded-2xl border border-cream-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-800">
                    Highlights:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-espresso-700">
                    {product.whatsIncluded.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={13} className="text-sage-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-cream-300 rounded-full bg-cream-100 px-3 py-2 gap-3 text-sm">
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

                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={16} className="text-emerald-400" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rosewood-700 hover:text-rosewood-800 hover:underline pt-1"
                  >
                    <span>View Full Product Breakdown & Gallery</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
