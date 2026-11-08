'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, CheckCircle, ArrowRight } from 'lucide-react';

interface MockupTab {
  id: string;
  name: string;
  shortName: string;
  device: string;
  tagline: string;
  image: string;
  bullets: string[];
  productSlug: string;
}

export function MockupInteractiveShowcase() {
  const tabs: MockupTab[] = [
    {
      id: 'notion-life',
      name: 'Notion Life Sanctuary',
      shortName: 'Life Planner',
      device: 'MacBook & iPhone View',
      tagline: 'Your central hub for peaceful daily rituals, habit streaks & quarterly goals.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Interconnected databases automatically sync daily actions to your annual goals',
        'Built-in morning mindset reflection and bedtime wind-down prompts',
      ],
      productSlug: 'aesthetic-notion-life-planner-2026',
    },
    {
      id: 'pet-health',
      name: 'Pet Parent Health Hub',
      shortName: 'Pet Hub 🐾',
      device: 'Mobile & Tablet Passport',
      tagline: 'Vet-approved records, medication schedules & 1-click pet sitter handover.',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Automatic 30-day alerts before rabies, core vaccines, or tick treatments expire',
        'Emergency 1-page sitter cheat sheet with feeding and vet contacts ready to print',
      ],
      productSlug: 'modern-pet-parent-notion-sanctuary',
    },
    {
      id: 'ipad-goodnotes',
      name: 'iPad GoodNotes Planner',
      shortName: 'iPad Journal',
      device: 'Apple Pencil & Tablet',
      tagline: 'Hyperlinked digital journal with 15,000+ internal tabs and 400+ pastel stickers.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Instant tab-clicking navigation between month, week, and day views with zero lag',
        'Pre-cropped aesthetic digital stickers in pastel peach, sage, and warm sand',
      ],
      productSlug: 'minimalist-pastel-goodnotes-ipad-planner-2026',
    },
    {
      id: 'sheets-wealth',
      name: 'Clean Wealth 50/30/20',
      shortName: '50/30/20 Budget',
      device: 'Google Sheets & Excel',
      tagline: 'Zero math required. Auto-calculating debt payoff snowball and sinking funds.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Automatically splits your paychecks into Needs (50%), Wants (30%), and Savings (20%)',
        'Visual debt snowball tracker estimates your debt-free date in real time',
      ],
      productSlug: 'clean-wealth-50-30-20-budgeting-spreadsheet',
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="interactive-mockups" className="py-8 sm:py-20 bg-cream-50/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Header - Compressed on mobile */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-900 border border-sage-200 text-[11px] sm:text-xs font-semibold mb-2">
            <Eye size={12} className="text-sage-700" />
            <span>Device Preview</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Designed for Real Life. Built for Every Screen.
          </h2>
        </div>

        {/* Tab Selector Buttons - Compact & non-wrapping */}
        <div className="flex justify-center mb-4 sm:mb-8 overflow-x-auto pb-1 -mx-2.5 px-2.5 sm:mx-0">
          <div className="inline-flex items-center gap-1 p-1 bg-cream-200/70 rounded-full border border-cream-300">
            {tabs.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-espresso-900 text-cream-50 shadow-soft'
                      : 'text-espresso-700 hover:text-espresso-950 hover:bg-cream-100/70'
                  }`}
                >
                  <span className="sm:hidden">{tab.shortName}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mockup Display Box - Compressed on mobile */}
        <div className="bg-cream-50 rounded-2xl sm:rounded-3xl border border-cream-300 shadow-soft-md sm:shadow-soft-xl p-3 sm:p-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            {/* Viewport */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-soft-sm border border-cream-300/80 aspect-[16/10] bg-cream-200">
                <Image
                  src={activeTab.image}
                  alt={activeTab.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-espresso-950/80 backdrop-blur-md text-cream-50 text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-espresso-800">
                  {activeTab.device}
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="lg:col-span-5 space-y-2 sm:space-y-4">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rosewood-700">
                  Live System Preview
                </span>
                <h3 className="font-serif text-lg sm:text-2xl text-espresso-950 font-medium">
                  {activeTab.name}
                </h3>
                <p className="text-xs sm:text-sm text-espresso-600 mt-1 leading-relaxed">
                  {activeTab.tagline}
                </p>
              </div>

              {/* Bullets */}
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-espresso-700">
                {activeTab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle
                      size={14}
                      className="text-sage-600 shrink-0 mt-0.5"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-1">
                <Link
                  href={`/products/${activeTab.productSlug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-espresso-900 hover:bg-espresso-800 text-cream-50 text-xs font-semibold tracking-wide shadow-soft transition-all"
                >
                  <span>Explore Template</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
