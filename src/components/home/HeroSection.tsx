'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  PawPrint,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-6 sm:pt-14 sm:pb-24">
      {/* Background ambient pastel glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] sm:h-[600px] pointer-events-none -z-10">
        <div className="absolute top-6 left-6 w-52 sm:w-80 h-52 sm:h-80 bg-rosewood-200/40 rounded-full blur-2xl sm:blur-3xl opacity-70 animate-pulse-subtle" />
        <div className="absolute top-16 right-6 w-60 sm:w-96 h-60 sm:h-96 bg-sage-200/50 rounded-full blur-2xl sm:blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-cream-300/80 shadow-soft-sm text-[11px] sm:text-xs font-medium text-espresso-800">
              <span className="flex h-1.5 w-1.5 rounded-full bg-rosewood-500 animate-ping" />
              <span className="font-semibold text-rosewood-800">Aesthetic Digital Atelier</span>
              <span className="text-cream-400">|</span>
              <span className="text-espresso-600 flex items-center gap-1">
                <PawPrint size={11} className="text-caramel-600" />
                Pet &amp; Life Hubs
              </span>
            </div>

            {/* Main Headline - Compressed on mobile */}
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-espresso-950 font-medium tracking-tight leading-[1.18] sm:leading-[1.12]">
              Aesthetic Life Sanctuaries &amp;{' '}
              <span className="italic font-normal text-rosewood-700 underline decoration-rosewood-200 decoration-wavy decoration-2">
                Mindful Pet Care
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-lg text-espresso-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
              Elevate your daily rituals. Beautifully engineered Notion
              dashboards, iPad journals, and pet health sanctuaries tailored for
              modern women who cherish calm spaces, organized finances, and their
              pets.
            </p>

            {/* Primary & Secondary CTAs - Compact side-by-side on mobile */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3.5 pt-1">
              <Button
                variant="primary"
                size="md"
                className="text-xs sm:text-sm py-2 px-4 sm:px-6 shadow-soft-lg group flex-1 sm:flex-initial"
                onClick={() => {
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Shop Assets</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>

              <Button
                variant="secondary"
                size="md"
                className="text-xs sm:text-sm py-2 px-4 sm:px-6 flex-1 sm:flex-initial"
                onClick={() => {
                  const el = document.getElementById('pet-parent-collection');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <PawPrint size={14} className="text-caramel-700" />
                <span>Pet Hub 🐾</span>
              </Button>
            </div>

            {/* Social Proof Pill Bar - Compressed on mobile */}
            <div className="pt-2 sm:pt-4 flex items-center justify-center lg:justify-start gap-3 sm:gap-6 text-[11px] sm:text-xs text-espresso-600 border-t border-cream-200/80 mt-3 sm:mt-6">
              <div className="flex items-center gap-1.5">
                <StarRating rating={4.96} size={12} />
                <span className="font-semibold text-espresso-900">4.96/5</span>
                <span className="hidden sm:inline">(12k+ downloads)</span>
              </div>

              <div className="flex items-center gap-1 text-espresso-700">
                <Zap size={12} className="text-caramel-500" />
                <span>Instant Download</span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-espresso-700">
                <ShieldCheck size={14} className="text-sage-600" />
                <span>Free Notion Plan Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase - Compressed on mobile */}
          <div className="lg:col-span-5 relative mt-1 sm:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Primary Central Mockup Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft-lg sm:shadow-soft-xl border border-cream-200/90 bg-cream-50 group">
                <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
                    alt="Aesthetic Notion Life Planner & iPad Sanctuary"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent" />

                  {/* Caption on mobile */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-cream-50 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-wider uppercase bg-rosewood-500/90 backdrop-blur-md px-2 py-0.5 rounded-full">
                        2026 Sanctuary
                      </span>
                      <h3 className="font-serif text-xs sm:text-base font-medium text-cream-50 drop-shadow-sm mt-0.5">
                        The Ultimate Aesthetic Notion Life System
                      </h3>
                    </div>
                    <span className="text-[10px] bg-cream-50/90 text-espresso-900 font-semibold px-2 py-0.5 rounded-full hidden sm:block">
                      Instant Access
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pet Card (Desktop only to prevent mobile clutter) */}
              <div className="absolute -bottom-6 -left-6 bg-cream-50/95 backdrop-blur-md p-3 rounded-2xl shadow-soft-xl border border-cream-300 max-w-[220px] hidden md:block animate-float-slow">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-cream-300">
                    <Image
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=160&q=80"
                      alt="Golden Retriever health dashboard"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="text-left text-xs">
                    <span className="text-[9px] font-bold text-caramel-700 uppercase tracking-wider block">
                      🐾 Pet Passport
                    </span>
                    <p className="text-[11px] font-semibold text-espresso-950 leading-tight">
                      Luna • Rabies Logged
                    </p>
                    <span className="text-[9px] text-emerald-600 font-medium">
                      ✓ Sitter Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
