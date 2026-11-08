'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Plus, Check, Sparkles, PawPrint } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
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
    <div className="group relative bg-cream-50 rounded-3xl border border-cream-200/90 shadow-soft-sm hover:shadow-soft-lg hover:border-cream-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image & Floating Badges */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-200/60">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {product.badges.map((badge, idx) => (
            <Badge key={idx} text={badge.text} variant={badge.variant} size="sm" />
          ))}
          {discount > 0 && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rosewood-500 text-cream-50 shadow-soft-sm font-mono">
              -{discount}%
            </span>
          )}
        </div>

        {/* Category tag badge top-right */}
        {product.category === 'pets' && (
          <div className="absolute top-3.5 right-3.5 z-10 bg-cream-50/90 backdrop-blur-md px-2 py-1 rounded-full text-[11px] font-semibold text-caramel-800 flex items-center gap-1 shadow-soft-sm border border-caramel-200/60">
            <PawPrint size={12} className="text-caramel-600" />
            <span>Pet Care</span>
          </div>
        )}

        {/* Quick View Button (Desktop overlay) */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="w-full py-2 bg-cream-50/95 backdrop-blur-md text-espresso-900 rounded-full text-xs font-semibold shadow-soft hover:bg-cream-100 transition-all flex items-center justify-center gap-1.5 border border-cream-300"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Reviews & Sales */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5">
              <StarRating rating={product.rating} size={13} />
              <span className="text-espresso-600 text-[11px] font-medium">
                ({product.reviewsCount})
              </span>
            </div>
            {product.salesCount && (
              <span className="text-[11px] text-espresso-400 font-medium">
                {product.salesCount}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block group-hover:text-rosewood-700 transition-colors">
            <h3 className="font-serif text-lg font-medium text-espresso-950 leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Short tagline */}
          <p className="text-xs text-espresso-600 mt-2 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Actions & Price */}
        <div className="pt-4 mt-4 border-t border-cream-200/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-espresso-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-espresso-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-soft-sm ${
              isAlreadyInCart
                ? 'bg-sage-100 text-sage-800 border border-sage-300 hover:bg-sage-200'
                : 'bg-espresso-900 text-cream-50 hover:bg-espresso-800'
            }`}
            aria-label={`Add ${product.title} to bag`}
          >
            {isAlreadyInCart ? (
              <>
                <Check size={13} className="text-sage-700" />
                <span>In Bag</span>
              </>
            ) : (
              <>
                <Plus size={13} />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
