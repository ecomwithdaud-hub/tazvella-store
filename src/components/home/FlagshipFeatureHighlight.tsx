'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';

export function FlagshipFeatureHighlight() {
  const flagship = PRODUCTS.find((p) => p.id === 'prod-notion-life-planner') || PRODUCTS[0];
  const { addToCart, items } = useCart();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState(0);

  const isInCart = items.some((i) => i.product.id === flagship.id);

  return (
    <section id="life-planners" className="py-8 sm:py-20 relative bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Top Flagship Banner - Compressed on mobile */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosewood-100 text-rosewood-800 border border-rosewood-200 text-[11px] sm:text-xs font-semibold mb-2">
            <Sparkles size={12} className="text-rosewood-600" />
            <span>Signature Flagship</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            The Ultimate Aesthetic Notion Life Planner
          </h2>

          <p className="text-xs sm:text-base text-espresso-600 mt-1 leading-relaxed font-light hidden sm:block">
            Over 45 interconnected dashboards working harmoniously so you never drop a goal or ritual.
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-10 items-center">
          {/* Left: Mockup Viewport */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-lg sm:shadow-soft-xl border border-cream-300 bg-cream-200">
              <Image
                src={
                  flagship.mockupTabs
                    ? flagship.mockupTabs[activeTab]?.image || flagship.thumbnail
                    : flagship.thumbnail
                }
                alt={flagship.title}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-espresso-950/80 backdrop-blur-md text-cream-50 text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full font-mono">
                {flagship.mockupTabs?.[activeTab]?.label || 'Central Hub'}
              </div>
            </div>

            {/* Tab switchers */}
            {flagship.mockupTabs && (
              <div className="flex gap-1.5 justify-center pt-1">
                {flagship.mockupTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
                      activeTab === idx
                        ? 'bg-rosewood-600 text-cream-50 shadow-soft-sm'
                        : 'bg-cream-100 text-espresso-700 hover:bg-cream-200 border border-cream-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: What's Included & Quick Buy */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <StarRating rating={flagship.rating} showScore size={13} />
                <span className="text-[11px] sm:text-xs text-espresso-500">
                  ({flagship.reviewsCount} reviews)
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Save 42% Today
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-4xl font-bold text-espresso-950">
                {formatPrice(flagship.price)}
              </span>
              {flagship.originalPrice && (
                <span className="text-xs sm:text-sm text-espresso-400 line-through">
                  {formatPrice(flagship.originalPrice)}
                </span>
              )}
            </div>

            {/* What's Included Breakdown - Compact on mobile */}
            <div className="bg-cream-100/80 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-cream-200 space-y-2">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-espresso-900">
                Included in Your Template:
              </h4>
              <ul className="space-y-1 sm:space-y-1.5 text-xs text-espresso-700">
                {flagship.whatsIncluded.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2
                      size={13}
                      className="text-sage-600 mt-0.5 shrink-0"
                    />
                    <span className="line-clamp-1 sm:line-clamp-none">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-1 flex flex-row items-center gap-2">
              <Button
                variant="primary"
                size="md"
                className="flex-1 shadow-soft-md text-xs sm:text-sm py-2 sm:py-3"
                onClick={() => addToCart(flagship, 1)}
              >
                {isInCart ? (
                  <>
                    <Check size={14} className="text-sage-300" />
                    <span>In Bag • Add Another</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Get Notion Access • {formatPrice(flagship.price)}</span>
                  </>
                )}
              </Button>

              <Link
                href={`/products/${flagship.slug}`}
                className="px-3 py-2 sm:py-3 rounded-full text-xs font-semibold text-rosewood-700 hover:text-rosewood-900 hover:bg-cream-200 transition-colors whitespace-nowrap"
              >
                Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
