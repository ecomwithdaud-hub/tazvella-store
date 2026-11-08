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
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Background ambient pastel glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-80 h-80 bg-rosewood-200/40 rounded-full blur-3xl opacity-70 animate-pulse-subtle" />
        <div className="absolute top-24 right-12 w-96 h-96 bg-sage-200/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-caramel-200/40 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-cream-300/80 shadow-soft-sm text-xs font-medium text-espresso-800">
              <span className="flex h-2 w-2 rounded-full bg-rosewood-500 animate-ping" />
              <span className="font-semibold text-rosewood-800">Aesthetic Digital Atelier</span>
              <span className="text-cream-400">|</span>
              <span className="text-espresso-600 flex items-center gap-1">
                <PawPrint size={12} className="text-caramel-600" />
                Pet Parents &amp; Lifestyle Hubs
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso-950 font-medium tracking-tight leading-[1.12]">
              Aesthetic Life Sanctuaries &amp;{' '}
              <span className="italic font-normal text-rosewood-700 underline decoration-rosewood-200 decoration-wavy decoration-2">
                Mindful Pet Care
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-espresso-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Elevate your daily rituals. Beautifully engineered Notion
              dashboards, iPad journals, and pet health sanctuaries tailored for
              modern women who cherish calm spaces, organized finances, and their
              pets.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-soft-lg group"
                onClick={() => {
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Shop Digital Assets</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  const el = document.getElementById('pet-parent-collection');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <PawPrint size={16} className="text-caramel-700" />
                <span>Explore Pet Parent Hub 🐾</span>
              </Button>
            </div>

            {/* Social Proof Pill Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-espresso-600 border-t border-cream-200/80 mt-6">
              <div className="flex items-center gap-2">
                <StarRating rating={4.96} size={14} />
                <span className="font-semibold text-espresso-900">4.96 / 5</span>
                <span>(12,400+ downloads)</span>
              </div>

              <div className="flex items-center gap-1.5 text-espresso-700">
                <Zap size={14} className="text-caramel-500" />
                <span>Instant Digital Delivery</span>
              </div>

              <div className="flex items-center gap-1.5 text-espresso-700">
                <ShieldCheck size={14} className="text-sage-600" />
                <span>Free Notion Plan Compatible</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Central Mockup Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl border border-cream-200/90 bg-cream-50 group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
                    alt="Aesthetic Notion Life Planner & iPad Sanctuary"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent" />

                  {/* On-image caption badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                    <span className="text-[10px] font-mono tracking-wider uppercase bg-rosewood-500/90 backdrop-blur-md px-2.5 py-1 rounded-full">
                      2026 Life &amp; Pet Sanctuary
                    </span>
                    <h3 className="font-serif text-lg font-medium mt-1.5 text-cream-50 drop-shadow-sm">
                      The Ultimate Aesthetic Notion Life System
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Pet Card (Feature 2 highlight) */}
              <div className="absolute -bottom-8 -left-6 sm:-left-8 bg-cream-50/95 backdrop-blur-md p-4 rounded-2xl shadow-soft-xl border border-cream-300 max-w-[240px] hidden sm:block animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-cream-300">
                    <Image
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80"
                      alt="Golden Retriever health dashboard"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-caramel-700 uppercase tracking-wider block">
                      🐾 Pet Passport
                    </span>
                    <p className="text-xs font-semibold text-espresso-950">
                      Luna • Rabies Due in 42 Days
                    </p>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      ✓ Sitter Card Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Satisfaction badge top-right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-cream-50/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-soft-lg border border-cream-300 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rosewood-100 text-rosewood-700 flex items-center justify-center font-bold">
                  <Sparkles size={16} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-espresso-400 block">
                    Customer Love
                  </span>
                  <span className="text-xs font-bold text-espresso-950">
                    99.4% 5-Star Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
