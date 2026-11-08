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
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export function FeaturedPetCollection() {
  const petProducts = PRODUCTS.filter((p) => p.category === 'pets');
  const flagshipPet = PRODUCTS.find((p) => p.id === 'prod-pet-parent-sanctuary');

  return (
    <section id="pet-parent-collection" className="py-20 sm:py-28 relative overflow-hidden bg-caramel-50/40">
      {/* Decorative background paw stamps */}
      <div className="absolute top-12 right-12 text-caramel-200/40 pointer-events-none -z-10 rotate-12">
        <PawPrint size={180} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel-100/80 border border-caramel-200 text-xs font-semibold text-caramel-900 mb-3.5 shadow-soft-sm">
            <PawPrint size={13} className="text-caramel-700" />
            <span>Featured Spotlight Collection</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            The Pet-Parent Sanctuary
          </h2>

          <p className="text-sm sm:text-base text-espresso-600 mt-3.5 leading-relaxed font-light">
            No more lost vaccination cards, forgotten flea treatments, or panic when leaving your fur baby with a sitter. Designed with aesthetic warmth and vet-approved organization.
          </p>
        </div>

        {/* Feature Highlight Banner: Why Pet Parents Love It */}
        <div className="bg-cream-50 rounded-3xl p-6 sm:p-10 border border-caramel-200/80 shadow-soft-lg mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual Preview */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft-md border border-cream-200 bg-cream-200">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80"
                  alt="Pet health and Notion passport"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute bottom-3 left-3 bg-cream-50/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cream-300 text-xs text-espresso-900 font-medium flex items-center gap-2 shadow-soft-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Vaccine Passport: Up to Date</span>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-caramel-700">
                Designed for Dogs, Cats &amp; Multi-Pet Families
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso-950 font-medium leading-snug">
                One Serene Sanctuary for Every Vet Visit, Meal, and Memory
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-2 font-semibold text-espresso-950 mb-1">
                    <CalendarCheck size={14} className="text-caramel-600" />
                    <span>Automated Reminders</span>
                  </div>
                  <p className="text-espresso-600 leading-relaxed">
                    Color-coded alerts 30 days before vaccines, boosters, or flea prevention are due.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-2 font-semibold text-espresso-950 mb-1">
                    <ShieldAlert size={14} className="text-rosewood-600" />
                    <span>Sitter Cheat Sheet</span>
                  </div>
                  <p className="text-espresso-600 leading-relaxed">
                    1-Click printable or textable instructions with feeding amounts and emergency contacts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-2 font-semibold text-espresso-950 mb-1">
                    <PawPrint size={14} className="text-sage-600" />
                    <span>Multi-Pet Switcher</span>
                  </div>
                  <p className="text-espresso-600 leading-relaxed">
                    Seamlessly toggle profiles for multiple dogs, cats, or rescue kittens without clutter.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cream-100/90 border border-cream-200">
                  <div className="flex items-center gap-2 font-semibold text-espresso-950 mb-1">
                    <Heart size={14} className="text-rosewood-600" />
                    <span>Memory Scrapbook</span>
                  </div>
                  <p className="text-espresso-600 leading-relaxed">
                    Cherish puppy milestones, adoption anniversaries, and silly photo moments forever.
                  </p>
                </div>
              </div>

              {flagshipPet && (
                <div className="pt-2">
                  <Link
                    href={`/products/${flagshipPet.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-caramel-500 hover:bg-caramel-600 text-cream-50 text-xs font-semibold tracking-wide shadow-soft transition-all"
                  >
                    <span>View Flagship Pet Sanctuary Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pet Collection Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {petProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
