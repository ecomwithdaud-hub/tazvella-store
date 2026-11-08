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

  const categories: Array<{ id: ProductCategory; label: string; icon?: string }> = [
    { id: 'all', label: 'All Digital Assets' },
    { id: 'life', label: 'Life & Planning' },
    { id: 'finances', label: 'Finances' },
    { id: 'pets', label: 'Pet Parents 🐾' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search
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

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured: bestsellers first
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-20 sm:py-28 relative bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-cream-200 text-xs font-semibold text-rosewood-800 mb-3 shadow-soft-sm">
            <Sparkles size={13} className="text-rosewood-500" />
            <span>Curated Digital Collection</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Designed for Flow &amp; Tranquility
          </h2>

          <p className="text-sm sm:text-base text-espresso-600 mt-3 leading-relaxed font-light">
            Each template is crafted with soothing palettes, streamlined workflows, and zero unnecessary complications.
          </p>
        </div>

        {/* Category Filter Tabs & Search / Sort Controls */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex p-1.5 bg-cream-200/80 rounded-full border border-cream-300 shadow-soft-sm">
              {categories.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-espresso-900 text-cream-50 shadow-soft'
                        : 'text-espresso-700 hover:text-espresso-950 hover:bg-cream-100/60'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.id === 'pets' && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-caramel-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search bar & Sort dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates, iPad, pets..."
                className="w-full pl-9 pr-4 py-2 bg-cream-50 border border-cream-300 rounded-full text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-espresso-800 shadow-soft-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-espresso-400 hover:text-espresso-800"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Product count & Sort selector */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-xs text-espresso-600">
              <span>
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'asset' : 'assets'}
              </span>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-cream-50 border border-cream-300 rounded-full px-3 py-1.5 text-xs text-espresso-800 focus:outline-none focus:border-espresso-800 shadow-soft-sm font-medium"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-cream-50 rounded-3xl border border-cream-200">
            <p className="font-serif text-lg text-espresso-800">
              No digital templates found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-espresso-500 mt-1">
              Try searching for &quot;Notion&quot;, &quot;Pet&quot;, &quot;Budget&quot; or clear the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-espresso-900 text-cream-50 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
