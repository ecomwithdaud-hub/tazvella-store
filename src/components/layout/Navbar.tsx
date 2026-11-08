'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Search, Menu, X, Heart, PawPrint } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          isScrolled
            ? 'glass-nav shadow-soft-sm py-3.5'
            : 'bg-cream-100/90 backdrop-blur-md py-5 border-b border-cream-200/60'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-espresso-700 hover:text-espresso-950 focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="group flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl sm:text-3xl tracking-tight font-medium text-espresso-950 group-hover:text-rosewood-700 transition-colors">
                    Tazvella
                  </span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rosewood-100 text-rosewood-700 group-hover:rotate-12 transition-transform">
                    <Sparkles size={11} />
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.22em] text-espresso-400 font-medium -mt-1 hidden sm:block">
                  Aesthetic Digital Atelier & Pet Care
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-espresso-700">
              <Link
                href="/#catalog"
                className="hover:text-rosewood-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-rosewood-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                All Digital Assets
              </Link>

              <Link
                href="/#pet-parent-collection"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel-50 text-caramel-800 hover:bg-caramel-100 border border-caramel-200 transition-colors"
              >
                <PawPrint size={14} className="text-caramel-600" />
                <span>Pet Parents</span>
                <span className="text-[10px] bg-caramel-200 text-caramel-900 font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  HOT
                </span>
              </Link>

              <Link
                href="/#life-planners"
                className="hover:text-rosewood-700 transition-colors py-1"
              >
                Life Planners
              </Link>

              <Link
                href="/#finances"
                className="hover:text-rosewood-700 transition-colors py-1"
              >
                Budget Hubs
              </Link>

              <Link
                href="/#interactive-mockups"
                className="hover:text-rosewood-700 transition-colors py-1 text-espresso-500"
              >
                Live Preview
              </Link>

              <Link
                href="/#faq"
                className="hover:text-rosewood-700 transition-colors py-1"
              >
                FAQ
              </Link>
            </nav>

            {/* Actions: Search link & Cart */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <a
                href="#catalog"
                className="p-2 text-espresso-600 hover:text-espresso-900 transition-colors rounded-full hover:bg-cream-200"
                aria-label="Search templates"
                title="Search templates"
              >
                <Search size={19} />
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 bg-espresso-900 hover:bg-espresso-800 text-cream-50 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-soft hover:shadow-soft-lg transition-all active:scale-95"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag size={16} />
                <span className="hidden sm:inline">Bag</span>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-rosewood-300 text-espresso-950 text-xs font-bold font-mono">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-espresso-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-cream-100 shadow-soft-xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-cream-200">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-medium text-espresso-950">
                    Tazvella
                  </span>
                  <Sparkles size={14} className="text-rosewood-500" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-espresso-500 hover:bg-cream-200"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <Link
                  href="/#catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-espresso-800 hover:text-rosewood-700 py-2"
                >
                  All Digital Assets
                </Link>

                <Link
                  href="/#pet-parent-collection"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-caramel-100/60 text-caramel-900 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <PawPrint size={16} className="text-caramel-600" />
                    Pet Parents Collection
                  </span>
                  <span className="text-[10px] bg-caramel-300 text-caramel-950 font-bold px-2 py-0.5 rounded-full">
                    FEATURED
                  </span>
                </Link>

                <Link
                  href="/#life-planners"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-espresso-800 hover:text-rosewood-700 py-2"
                >
                  Aesthetic Notion Planners
                </Link>

                <Link
                  href="/#finances"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-espresso-800 hover:text-rosewood-700 py-2"
                >
                  Clean Wealth Budget Hubs
                </Link>

                <Link
                  href="/#interactive-mockups"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-espresso-800 hover:text-rosewood-700 py-2"
                >
                  Interactive Device Preview
                </Link>

                <Link
                  href="/#reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-espresso-800 hover:text-rosewood-700 py-2"
                >
                  Customer Love & Reviews
                </Link>

                <Link
                  href="/#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-espresso-800 hover:text-rosewood-700 py-2"
                >
                  Frequently Asked Questions
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-cream-200">
              <p className="text-xs text-espresso-500 mb-3">
                Questions or support? We are here to help:
              </p>
              <a
                href="mailto:hello@tazvella.com"
                className="text-xs font-semibold text-rosewood-700 hover:underline"
              >
                hello@tazvella.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
