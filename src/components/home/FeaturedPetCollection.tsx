'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  PawPrint,
  Heart,
  CalendarCheck,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export function FeaturedPetCollection() {
  const petProducts = PRODUCTS.filter((p) => p.category === 'pets');
  const flagshipPet = PRODUCTS.find((p) => p.id === 'prod-pet-parent-sanctuary');

  return (
    <section id="pet-parent-collection" className="py-8 sm:py-20 relative overflow-hidden bg-caramel-50/40">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Section Header - Compressed on mobile */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel-100/80 border border-caramel-200 text-[11px] sm:text-xs font-semibold text-caramel-900 mb-2 shadow-soft-sm">
            <PawPrint size={12} className="text-caramel-700" />
            <span>Featured Collection</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            The Pet-Parent Sanctuary
          </h2>

          <p className="text-xs sm:text-base text-espresso-600 mt-1.5 leading-relaxed font-light hidden sm:block">
            No more lost vaccination cards or panic with pet sitters. Vet-approved Notion dashboards &amp; journals.
          </p>
        </div>

        {/* Feature Highlight Banner: Compressed on mobile */}
        <div className="bg-cream-50 rounded-2xl sm:rounded-3xl p-3 sm:p-8 border border-caramel-200/80 shadow-soft-md mb-6 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            {/* Left Visual Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/9] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-soft-sm border border-cream-200 bg-cream-200">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80"
                  alt="Pet health and Notion passport"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute bottom-2 left-2 bg-cream-50/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cream-300 text-[10px] sm:text-xs text-espresso-900 font-medium flex items-center gap-1.5 shadow-soft-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Vaccine Passport: Up to Date</span>
                </div>
              </div>
            </div>

            {/* Right Pillars - Ultra-compact 2x2 on mobile */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-caramel-700">
                  🐾 Multi-Pet Ready (Dogs &amp; Cats)
                </span>
                {flagshipPet && (
                  <Link
                    href={`/products/${flagshipPet.slug}`}
                    className="text-xs font-semibold text-rosewood-700 hover:underline flex items-center gap-1 sm:hidden"
                  >
                    <span>Details</span>
                    <ArrowRight size={11} />
                  </Link>
                )}
              </div>

              <h3 className="font-serif text-base sm:text-2xl text-espresso-950 font-medium leading-snug">
                One Serene Hub for Every Vet Visit, Meal, &amp; Memory
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-1 sm:gap-1.5 font-semibold text-espresso-950 text-[11px] sm:text-xs mb-0.5">
                    <CalendarCheck size={12} className="text-caramel-600 shrink-0" />
                    <span>Auto Alerts</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-espresso-600 line-clamp-1 sm:line-clamp-none">
                    Vaccine renewals &amp; meds
                  </p>
                </div>

                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-1 sm:gap-1.5 font-semibold text-espresso-950 text-[11px] sm:text-xs mb-0.5">
                    <ShieldAlert size={12} className="text-rosewood-600 shrink-0" />
                    <span>Sitter Sheet</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-espresso-600 line-clamp-1 sm:line-clamp-none">
                    1-Click printable guide
                  </p>
                </div>

                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-1 sm:gap-1.5 font-semibold text-espresso-950 text-[11px] sm:text-xs mb-0.5">
                    <PawPrint size={12} className="text-sage-600 shrink-0" />
                    <span>Multi-Pet</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-espresso-600 line-clamp-1 sm:line-clamp-none">
                    Unlimited pet profiles
                  </p>
                </div>

                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-1 sm:gap-1.5 font-semibold text-espresso-950 text-[11px] sm:text-xs mb-0.5">
                    <Heart size={12} className="text-rosewood-600 shrink-0" />
                    <span>Scrapbook</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-espresso-600 line-clamp-1 sm:line-clamp-none">
                    Memories &amp; milestones
                  </p>
                </div>
              </div>

              {flagshipPet && (
                <div className="pt-1 hidden sm:block">
                  <Link
                    href={`/products/${flagshipPet.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-caramel-500 hover:bg-caramel-600 text-cream-50 text-xs font-semibold tracking-wide shadow-soft transition-all"
                  >
                    <span>View Flagship Pet Sanctuary Details</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 COLUMNS PET PRODUCTS GRID */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {petProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
