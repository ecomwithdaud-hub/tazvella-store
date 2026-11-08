'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { FAQS } from '@/data/faqs';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-8 sm:py-20 bg-cream-50/70 border-t border-cream-200">
      <div className="max-w-4xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Section Header - Compressed on mobile */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 text-espresso-800 border border-cream-200 text-[11px] sm:text-xs font-semibold mb-2 shadow-soft-sm">
            <HelpCircle size={12} className="text-rosewood-600" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List - Compressed padding on mobile */}
        <div className="space-y-2 sm:space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-cream-50 rounded-xl sm:rounded-2xl border border-cream-200/90 shadow-soft-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xs sm:text-base md:text-lg font-medium text-espresso-950">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cream-200/80 flex items-center justify-center shrink-0 text-espresso-700 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-rosewood-100 text-rosewood-800' : ''
                    }`}
                  >
                    <ChevronDown size={13} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-3.5 pt-0.5 sm:px-6 sm:pb-5 text-xs sm:text-sm text-espresso-600 leading-relaxed border-t border-cream-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Banner - Compact on mobile */}
        <div className="mt-6 sm:mt-10 text-center p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-cream-100 border border-cream-200 text-xs text-espresso-700 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Mail size={14} className="text-rosewood-600" />
            <span>Still have a question before purchasing?</span>
          </div>
          <a
            href="mailto:hello@tazvella.com"
            className="font-semibold text-rosewood-700 hover:text-rosewood-800 underline"
          >
            hello@tazvella.com
          </a>
        </div>
      </div>
    </section>
  );
}
