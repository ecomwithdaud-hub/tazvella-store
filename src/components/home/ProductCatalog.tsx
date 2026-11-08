'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Search, SlidersHorizontal, PawPrint, Heart, Check } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCategory, Product } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: Array<{ id: ProductCategory; label: string; shortLabel: string }> = [
    { id: 'all', label: 'All Digital Assets', shortLabel: 'All Assets' },
    { id: 'life', label: 'Life & Planning', shortLabel: 'Life Planners' },
    { id: 'finances', label: 'Finances', shortLabel: 'Finances' },
    { id: 'pets', label: 'Pet Parents 🐾', shortLabel: 'Pets 🐾' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.compatibility.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-8 sm:py-20 relative bg-cream-100">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Section Header - Compact on mobile */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-cream-200 text-[11px] sm:text-xs font-semibold text-rosewood-800 mb-2 shadow-soft-sm">
            <Sparkles size={11} className="text-rosewood-500" />
            <span>Curated Digital Collection</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Designed for Flow &amp; Tranquility
          </h2>

          <p className="text-xs sm:text-base text-espresso-600 mt-1.5 leading-relaxed font-light hidden sm:block">
            Each template is crafted with soothing palettes, streamlined workflows, and zero unnecessary complications.
          </p>
        </div>

        {/* Category Filter Tabs & Search / Sort Controls */}
        <div className="space-y-3 mb-5 sm:mb-8">
          {/* Category Tabs - Compact & non-wrapping on mobile */}
          <div className="flex items-center justify-center overflow-x-auto pb-1 -mx-2.5 px-2.5 sm:mx-0 sm:px-0">
            <div className="inline-flex p-1 bg-cream-200/80 rounded-full border border-cream-300 shadow-soft-sm gap-0.5">
              {categories.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                      isActive
                        ? 'bg-espresso-900 text-cream-50 shadow-soft'
                        : 'text-espresso-700 hover:text-espresso-950 hover:bg-cream-100/60'
                    }`}
                  >
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar & Sort selector */}
          <div className="flex items-center justify-between gap-2 pt-1">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-8 pr-3 py-1.5 sm:py-2 bg-cream-50 border border-cream-300 rounded-full text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-espresso-800 shadow-soft-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-espresso-400 hover:text-espresso-800"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 text-xs text-espresso-600">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-cream-50 border border-cream-300 rounded-full px-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs text-espresso-800 focus:outline-none focus:border-espresso-800 shadow-soft-sm font-medium"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3 COLUMNS PRODUCT CARDS GRID (3 Cards Per Row on Mobile & Desktop) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 bg-cream-50 rounded-2xl border border-cream-200">
            <p className="font-serif text-base text-espresso-800">
              No digital templates found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-3.5 py-1.5 rounded-full bg-espresso-900 text-cream-50 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
