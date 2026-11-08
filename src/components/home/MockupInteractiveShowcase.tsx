'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Smartphone,
  Laptop,
  Tablet,
  PawPrint,
  CheckCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';

interface MockupTab {
  id: string;
  name: string;
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
      device: 'MacBook & iPhone View',
      tagline: 'Your central hub for peaceful daily rituals, habit streaks & quarterly goals.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Interconnected databases automatically sync daily actions to your annual goals',
        'Built-in morning mindset reflection and bedtime wind-down prompts',
        'Automated meal planner generates organized weekly grocery checklists',
      ],
      productSlug: 'aesthetic-notion-life-planner-2026',
    },
    {
      id: 'pet-health',
      name: 'Pet Parent Health Hub',
      device: 'Mobile & Tablet Passport',
      tagline: 'Vet-approved records, medication schedules & 1-click pet sitter handover.',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Automatic 30-day alerts before rabies, core vaccines, or tick treatments expire',
        'Emergency 1-page sitter cheat sheet with feeding and vet contacts ready to print',
        'Multi-pet profile switcher for unlimited dogs, cats, and rescue pets',
      ],
      productSlug: 'modern-pet-parent-notion-sanctuary',
    },
    {
      id: 'ipad-goodnotes',
      name: 'iPad GoodNotes Planner',
      device: 'Apple Pencil & Tablet',
      tagline: 'Hyperlinked digital journal with 15,000+ internal tabs and 400+ pastel stickers.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Instant tab-clicking navigation between month, week, and day views with zero lag',
        'Pre-cropped aesthetic digital stickers in pastel peach, sage, and warm sand',
        'Compatible with GoodNotes 5 & 6, Notability, and reMarkable',
      ],
      productSlug: 'minimalist-pastel-goodnotes-ipad-planner-2026',
    },
    {
      id: 'sheets-wealth',
      name: 'Clean Wealth 50/30/20',
      device: 'Google Sheets & Excel',
      tagline: 'Zero math required. Auto-calculating debt payoff snowball and sinking funds.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      bullets: [
        'Automatically splits your paychecks into Needs (50%), Wants (30%), and Savings (20%)',
        'Visual debt snowball tracker estimates your debt-free date in real time',
        'One-click multi-currency selector for USD, EUR, GBP, CAD, and AUD',
      ],
      productSlug: 'clean-wealth-50-30-20-budgeting-spreadsheet',
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="interactive-mockups" className="py-20 sm:py-28 bg-cream-50/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-900 border border-sage-200 text-xs font-semibold mb-3">
            <Eye size={13} className="text-sage-700" />
            <span>Interactive Device Showcase</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Designed for Real Life. Built for Every Screen.
          </h2>

          <p className="text-sm sm:text-base text-espresso-600 mt-3 leading-relaxed font-light">
            Toggle between templates to see how each workspace transforms your laptop, iPad, or smartphone into a serene center of organization.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-cream-200/70 rounded-full border border-cream-300 max-w-3xl">
            {tabs.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-espresso-900 text-cream-50 shadow-soft'
                      : 'text-espresso-700 hover:text-espresso-950 hover:bg-cream-100/70'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mockup Display Box */}
        <div className="bg-cream-50 rounded-3xl border border-cream-300 shadow-soft-xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Mockup Viewport */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-soft-lg border border-cream-300/80 aspect-[16/10] bg-cream-200">
                <Image
                  src={activeTab.image}
                  alt={activeTab.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />

                {/* Device badge */}
                <div className="absolute top-3 left-3 bg-espresso-950/80 backdrop-blur-md text-cream-50 text-[11px] font-mono px-3 py-1 rounded-full border border-espresso-800">
                  {activeTab.device}
                </div>
              </div>
            </div>

            {/* Right Information & Bullets */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rosewood-700">
                  Live System Preview
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-espresso-950 font-medium mt-1">
                  {activeTab.name}
                </h3>
                <p className="text-xs sm:text-sm text-espresso-600 mt-2 leading-relaxed">
                  {activeTab.tagline}
                </p>
              </div>

              {/* Bullets */}
              <ul className="space-y-3 text-xs sm:text-sm text-espresso-700">
                {activeTab.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={16}
                      className="text-sage-600 shrink-0 mt-0.5"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href={`/products/${activeTab.productSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso-900 hover:bg-espresso-800 text-cream-50 text-xs font-semibold tracking-wide shadow-soft transition-all"
                >
                  <span>Explore {activeTab.name}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
