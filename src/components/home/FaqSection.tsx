'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, Sparkles } from 'lucide-react';
import { FAQS } from '@/data/faqs';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-cream-50/70 border-t border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 text-espresso-800 border border-cream-200 text-xs font-semibold mb-3 shadow-soft-sm">
            <HelpCircle size={13} className="text-rosewood-600" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-espresso-600 mt-3 leading-relaxed font-light">
            Everything you need to know about instant delivery, Notion accounts, device compatibility, and pet dashboards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-cream-50 rounded-2xl border border-cream-200/90 shadow-soft-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-espresso-950">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-cream-200/80 flex items-center justify-center shrink-0 text-espresso-700 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-rosewood-100 text-rosewood-800' : ''
                    }`}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-espresso-600 leading-relaxed border-t border-cream-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-cream-100 border border-cream-200 text-xs text-espresso-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-rosewood-600" />
            <span>Still have a question before purchasing?</span>
          </div>
          <a
            href="mailto:hello@tazvella.com"
            className="font-semibold text-rosewood-700 hover:text-rosewood-800 underline"
          >
            Reach out directly at hello@tazvella.com
          </a>
        </div>
      </div>
    </section>
  );
}
