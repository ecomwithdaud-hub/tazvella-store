'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
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
    <section id="life-planners" className="py-20 sm:py-28 relative bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Flagship Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rosewood-100 text-rosewood-800 border border-rosewood-200 text-xs font-semibold mb-3">
            <Sparkles size={13} className="text-rosewood-600" />
            <span>Signature Flagship System</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            The Ultimate Aesthetic Notion Life Planner
          </h2>

          <p className="text-sm sm:text-base text-espresso-600 mt-3 leading-relaxed font-light">
            Engineered from 3 years of Notion database optimization. Over 45 interconnected dashboards working harmoniously so you never drop a goal or morning ritual again.
          </p>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Tab Mockups */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-soft-xl border border-cream-300 bg-cream-200">
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
              <div className="absolute top-4 left-4 bg-espresso-950/80 backdrop-blur-md text-cream-50 text-xs px-3.5 py-1 rounded-full font-mono">
                {flagship.mockupTabs?.[activeTab]?.label || 'Central Hub'}
              </div>
            </div>

            {/* Tab switchers */}
            {flagship.mockupTabs && (
              <div className="flex gap-2 justify-center pt-2">
                {flagship.mockupTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
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
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <StarRating rating={flagship.rating} showScore size={15} />
              <span className="text-xs text-espresso-500">
                ({flagship.reviewsCount} reviews • {flagship.salesCount})
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-espresso-950">
                {formatPrice(flagship.price)}
              </span>
              {flagship.originalPrice && (
                <span className="text-sm text-espresso-400 line-through">
                  {formatPrice(flagship.originalPrice)}
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Save 42% Today
              </span>
            </div>

            <p className="text-xs sm:text-sm text-espresso-700 leading-relaxed">
              {flagship.description}
            </p>

            {/* What's Included Breakdown */}
            <div className="bg-cream-100/80 p-5 rounded-2xl border border-cream-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-900">
                What&apos;s Included Inside:
              </h4>
              <ul className="space-y-2 text-xs text-espresso-700">
                {flagship.whatsIncluded.slice(0, 5).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-sage-600 mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto flex-1 shadow-soft-lg"
                onClick={() => addToCart(flagship, 1)}
              >
                {isInCart ? (
                  <>
                    <Check size={16} className="text-sage-300" />
                    <span>In Your Bag • Add Another</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Get Instant Notion Access • {formatPrice(flagship.price)}</span>
                  </>
                )}
              </Button>

              <Link
                href={`/products/${flagship.slug}`}
                className="w-full sm:w-auto text-center px-4 py-3 rounded-full text-xs font-semibold text-rosewood-700 hover:text-rosewood-900 hover:bg-cream-200 transition-colors"
              >
                Full Details Page →
              </Link>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-espresso-500 pt-1">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-caramel-500" />
                Instant Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-sage-600" />
                Lifetime Free Updates
              </span>
              <span>•</span>
              <span>Free Notion Compatible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
