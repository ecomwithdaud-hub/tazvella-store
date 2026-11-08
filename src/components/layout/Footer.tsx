'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Heart,
  PawPrint,
  CheckCircle,
  ShieldCheck,
  Zap,
  Mail,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-espresso-950 text-cream-200 pt-16 pb-12 border-t border-espresso-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Guarantee banner */}
        <div className="bg-espresso-900 rounded-3xl p-8 sm:p-10 mb-16 border border-espresso-800/80 shadow-soft-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rosewood-900/60 text-rosewood-300 border border-rosewood-800 text-xs font-medium mb-3">
              <Sparkles size={12} />
              <span>Join The Inner Circle</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 font-medium">
              Receive 15% off your first aesthetic dashboard.
            </h3>
            <p className="text-espresso-300 text-sm mt-2 leading-relaxed">
              Plus receive our free <em>Weekly Habit Reset & Dog/Cat Wellness</em>{' '}
              mini-tracker straight to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-200 px-5 py-4 rounded-2xl flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-sm text-emerald-300">
                    Welcome to Tazvella!
                  </p>
                  <p>Check your inbox for code <strong>WELCOME15</strong>.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-espresso-950/80 border border-espresso-700 rounded-full text-sm text-cream-50 placeholder-espresso-400 focus:outline-none focus:border-rosewood-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-rosewood-200 hover:bg-rosewood-100 text-espresso-950 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-soft"
                >
                  <span>Claim 15%</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-espresso-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-medium tracking-tight text-cream-50">
                Tazvella
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rosewood-900/80 text-rosewood-300">
                <Sparkles size={11} />
              </span>
            </div>
            <p className="text-espresso-300 text-sm leading-relaxed max-w-sm">
              Thoughtfully curated digital systems, Notion sanctuaries, and pet
              wellness planners crafted for modern women balancing ambition,
              peaceful rituals, and deep love for their pets.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-espresso-400">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-caramel-400" />
                Instant Download
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-sage-400" />
                Lifetime Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <PawPrint size={14} className="text-rosewood-300" />
                Pet Parent Approved
              </span>
            </div>
          </div>

          {/* Product Lines */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-espresso-400 mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-espresso-300">
              <li>
                <Link
                  href="/#pet-parent-collection"
                  className="hover:text-cream-50 transition-colors flex items-center gap-1.5"
                >
                  <span>Pet Parent Sanctuaries</span>
                  <span className="text-[10px] text-caramel-400 font-bold">🐾</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#life-planners"
                  className="hover:text-cream-50 transition-colors"
                >
                  Notion Life Planners
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-cream-50 transition-colors"
                >
                  iPad GoodNotes Journals
                </Link>
              </li>
              <li>
                <Link
                  href="/#finances"
                  className="hover:text-cream-50 transition-colors"
                >
                  Clean Wealth Budget Hubs
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalog"
                  className="hover:text-cream-50 transition-colors"
                >
                  Canva Aesthetic Brand Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-espresso-400 mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-espresso-300">
              <li>
                <Link href="/#faq" className="hover:text-cream-50 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  className="hover:text-cream-50 transition-colors"
                >
                  Customer Reviews
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@tazvella.com"
                  className="hover:text-cream-50 transition-colors"
                >
                  hello@tazvella.com
                </a>
              </li>
              <li>
                <span className="text-xs text-espresso-400">
                  Response time: &lt; 12 hours
                </span>
              </li>
            </ul>
          </div>

          {/* Compatibility Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-espresso-400 mb-4">
              Compatible With
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-espresso-300">
              <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                Notion (Free & Plus)
              </span>
              <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                GoodNotes 5 & 6
              </span>
              <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                Apple iPad & Mac
              </span>
              <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                Google Sheets
              </span>
              <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                Canva (Free & Pro)
              </span>
              <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                Printable PDF
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-espresso-400 gap-4">
          <p>© {new Date().getFullYear()} Tazvella (tazvella.com). All rights reserved. Made with love for mindful humans & pets.</p>
          <div className="flex items-center gap-6">
            <span>Instant Cloud Delivery</span>
            <span>256-Bit SSL Encryption</span>
            <span>Personal Use License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
