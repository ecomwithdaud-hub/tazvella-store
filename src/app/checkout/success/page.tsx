'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  Download,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail,
  Heart,
  Copy,
  Check,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface OrderSummary {
  orderId: string;
  email: string;
  firstName: string;
  items: Array<{
    product: {
      id: string;
      title: string;
      categoryLabel: string;
      instantDownloadNotes: string;
    };
    quantity: number;
  }>;
  total: number;
  date: string;
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Fire festive celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D59681', '#90AC94', '#E1A663', '#FAF8F5'],
      });
    } catch {
      // ignore
    }

    const saved = sessionStorage.getItem('tazvella_last_order');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const copyTemplateLink = () => {
    navigator.clipboard.writeText('https://tazvella.notion.site/template-duplicate-access-demo');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full flex-1">
        {/* Top Celebration Card */}
        <div className="bg-cream-50 rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-soft-lg text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-sage-100 border border-sage-300 text-sage-700 flex items-center justify-center mx-auto mb-5 shadow-soft-sm">
            <CheckCircle size={32} />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosewood-100 text-rosewood-800 text-xs font-semibold mb-3">
            <Sparkles size={12} />
            <span>Order Confirmed & Digital Assets Ready</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso-950">
            Thank you, {order?.firstName || 'beautiful friend'}!
          </h1>
          <p className="text-espresso-600 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
            Your aesthetic digital templates have been generated. A confirmation receipt and permanent backup access links have been sent to{' '}
            <strong className="text-espresso-900">{order?.email || 'your email'}</strong>.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-cream-200/80 text-xs text-espresso-600 font-mono">
            <span>Order: <strong>{order?.orderId || 'TZ-849201'}</strong></span>
            <span>•</span>
            <span>Date: {order?.date || new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>Status: Instant Access Active</span>
          </div>
        </div>

        {/* Instant Access & Download Cards */}
        <div className="mt-8 space-y-4">
          <h2 className="font-serif text-2xl font-medium text-espresso-900">
            Your Instant Download Sanctuary
          </h2>

          <div className="space-y-4">
            {(order?.items || [
              {
                product: {
                  id: 'flagship',
                  title: 'The Ultimate Aesthetic Notion Life Planner (2026 Edition)',
                  categoryLabel: 'Life & Planning',
                  instantDownloadNotes: '1-Click Notion duplicate link + 12-page setup guide',
                },
                quantity: 1,
              },
              {
                product: {
                  id: 'pet-hub',
                  title: 'The Modern Pet Parent Notion Sanctuary (Dog & Cat Edition)',
                  categoryLabel: 'Pet Parents',
                  instantDownloadNotes: 'Instant access link delivered to your inbox with immediate multi-pet setup guide.',
                },
                quantity: 1,
              },
            ]).map((item, idx) => (
              <div
                key={idx}
                className="bg-cream-50 rounded-2xl p-6 border border-cream-200 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rosewood-700 bg-rosewood-100 px-2 py-0.5 rounded-full">
                      {item.product.categoryLabel}
                    </span>
                    <span className="text-xs text-espresso-500">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-espresso-950">
                    {item.product.title}
                  </h3>
                  <p className="text-xs text-espresso-600">
                    {item.product.instantDownloadNotes}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    onClick={copyTemplateLink}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 border border-cream-300 text-espresso-800 text-xs font-semibold transition-colors"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-700">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Notion URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://notion.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-espresso-900 hover:bg-espresso-800 text-cream-50 text-xs font-semibold shadow-soft transition-colors"
                  >
                    <Download size={14} />
                    <span>Open in Notion</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Guide Step-by-Step */}
        <div className="mt-10 bg-cream-200/50 rounded-3xl p-6 sm:p-8 border border-cream-300/80">
          <h3 className="font-serif text-xl font-medium text-espresso-950 mb-4">
            How to Duplicate & Start Using in 3 Simple Steps:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-espresso-700">
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center font-bold font-mono">
                1
              </span>
              <h4 className="font-bold text-espresso-900 text-sm">Open the Link</h4>
              <p>Click &quot;Open in Notion&quot; or paste your duplicate link into any browser logged into your free Notion account.</p>
            </div>
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center font-bold font-mono">
                2
              </span>
              <h4 className="font-bold text-espresso-900 text-sm">Tap &quot;Duplicate&quot;</h4>
              <p>In the top right corner of Notion, tap the <strong>Duplicate</strong> button to copy the sanctuary to your workspace.</p>
            </div>
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-espresso-900 text-cream-50 flex items-center justify-center font-bold font-mono">
                3
              </span>
              <h4 className="font-bold text-espresso-900 text-sm">Add Your Rituals & Pets</h4>
              <p>Follow the built-in welcome video to personalize with your dog/cat names, routine schedules, and financial goals!</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-cream-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-espresso-600">
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-rosewood-600" />
              Need personal setup help? Write us anytime at <strong>hello@tazvella.com</strong>
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-semibold text-rosewood-700 hover:text-rosewood-800 hover:underline"
            >
              <span>Back to Tazvella Storefront</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
