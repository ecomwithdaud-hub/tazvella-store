'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Plus, Check, Star, PawPrint } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Badge } from '@/components/ui/Badge';
import { calculateDiscount } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setQuickViewProduct, items } = useCart();
  const { formatPrice } = useCurrency();

  const isAlreadyInCart = items.some((item) => item.product.id === product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <div className="group relative bg-cream-50 rounded-2xl sm:rounded-3xl border border-cream-200/90 shadow-soft-sm hover:shadow-soft-lg hover:border-cream-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image & Floating Badges */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] overflow-hidden bg-cream-200/60">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
          />
        </Link>

        {/* Badges Overlay - Compact on mobile */}
        <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 flex flex-wrap gap-1 z-10">
          {product.badges.slice(0, 1).map((badge, idx) => (
            <span
              key={idx}
              className={`text-[9px] sm:text-xs px-1.5 py-0.5 font-medium rounded-full border shadow-soft-sm ${
                badge.variant === 'caramel'
                  ? 'bg-caramel-100 text-caramel-800 border-caramel-200'
                  : badge.variant === 'rose'
                  ? 'bg-rosewood-100 text-rosewood-800 border-rosewood-200'
                  : 'bg-cream-100 text-espresso-800 border-cream-300'
              }`}
            >
              {badge.text}
            </span>
          ))}

          {discount > 0 && (
            <span className="text-[9px] sm:text-[11px] font-bold px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-rosewood-500 text-cream-50 font-mono shadow-soft-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Pet icon indicator on mobile */}
        {product.category === 'pets' && (
          <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 z-10 bg-cream-50/90 backdrop-blur-md p-1 sm:px-2 sm:py-1 rounded-full text-caramel-800 flex items-center gap-1 shadow-soft-sm border border-caramel-200/60">
            <PawPrint size={10} className="text-caramel-600 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline text-[11px] font-semibold">Pet</span>
          </div>
        )}

        {/* Quick View Button (Desktop overlay) */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-2.5 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="w-full py-1.5 bg-cream-50/95 backdrop-blur-md text-espresso-900 rounded-full text-xs font-semibold shadow-soft hover:bg-cream-100 transition-all flex items-center justify-center gap-1 border border-cream-300"
          >
            <Eye size={12} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content - Compressed on mobile */}
      <div className="p-2 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Reviews Rating - Ultra-compact */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1 sm:mb-1.5 text-espresso-500">
            <div className="flex items-center gap-0.5 sm:gap-1 text-caramel-600 font-semibold">
              <Star size={11} className="fill-caramel-500 text-caramel-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="hidden sm:inline text-espresso-400 font-normal">
                ({product.reviewsCount})
              </span>
            </div>
            {product.categoryLabel && (
              <span className="hidden md:inline text-[10px] uppercase font-mono tracking-wider text-espresso-400">
                {product.categoryLabel}
              </span>
            )}
          </div>

          {/* Title - Clamped to 2 lines cleanly */}
          <Link
            href={`/products/${product.slug}`}
            className="block group-hover:text-rosewood-700 transition-colors"
          >
            <h3 className="font-serif text-xs sm:text-base md:text-lg font-medium text-espresso-950 leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Short tagline - Hidden on mobile to save vertical space */}
          <p className="hidden md:block text-xs text-espresso-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Actions & Price */}
        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-cream-200/80 flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5">
            <span className="font-serif text-xs sm:text-base md:text-xl font-bold text-espresso-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="hidden sm:inline text-[10px] sm:text-xs text-espresso-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Compact Add Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className={`inline-flex items-center justify-center rounded-full font-semibold transition-all active:scale-90 shadow-soft-sm ${
              isAlreadyInCart
                ? 'bg-sage-100 text-sage-800 border border-sage-300 hover:bg-sage-200'
                : 'bg-espresso-900 text-cream-50 hover:bg-espresso-800'
            } p-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs`}
            aria-label={`Add ${product.title} to bag`}
          >
            {isAlreadyInCart ? (
              <>
                <Check size={12} className="text-sage-700" />
                <span className="hidden sm:inline sm:ml-1">In Bag</span>
              </>
            ) : (
              <>
                <Plus size={12} />
                <span className="hidden sm:inline sm:ml-1">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
