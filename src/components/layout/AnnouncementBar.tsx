'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, ChevronDown } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { Currency } from '@/types';

export function AnnouncementBar() {
  const [copied, setCopied] = useState(false);
  const { currentCurrency, setCurrencyCode, currencies } = useCurrency();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const copyPromo = () => {
    navigator.clipboard.writeText('TAZVELLA30');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-espresso-950 text-cream-100 text-xs py-2 px-4 border-b border-espresso-800 transition-all relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left perk */}
        <div className="hidden md:flex items-center gap-2 text-espresso-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Instant Download & Lifetime Template Access</span>
        </div>

        {/* Center promo banner */}
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <Sparkles size={14} className="text-caramel-400 animate-spin-slow" />
          <span>Spring Refresh: 30% OFF All Notion & Pet Dashboards</span>
          <button
            onClick={copyPromo}
            className="inline-flex items-center gap-1 bg-espresso-800 hover:bg-espresso-700 text-caramel-300 px-2 py-0.5 rounded text-[11px] font-mono transition-colors border border-espresso-700"
            title="Click to copy code"
          >
            {copied ? (
              <>
                <Check size={11} className="text-emerald-400" />
                <span className="text-emerald-400">COPIED</span>
              </>
            ) : (
              <>
                <span>TAZVELLA30</span>
                <Copy size={10} />
              </>
            )}
          </button>
        </div>

        {/* Right currency selector */}
        <div className="flex items-center gap-4 text-espresso-300">
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 hover:text-cream-100 transition-colors focus:outline-none"
            >
              <span>
                {currentCurrency.code} ({currentCurrency.symbol})
              </span>
              <ChevronDown size={12} />
            </button>

            {currencyDropdownOpen && (
              <div
                className="absolute right-0 mt-1 py-1 w-28 bg-espresso-900 border border-espresso-700 rounded-lg shadow-soft-lg z-50 text-cream-200"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrencyCode(curr.code as Currency['code']);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-espresso-800 transition-colors flex items-center justify-between ${
                      currentCurrency.code === curr.code
                        ? 'text-caramel-300 font-semibold'
                        : ''
                    }`}
                  >
                    <span>{curr.code}</span>
                    <span>{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
