'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Quote, Sparkles, Heart } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { StarRating } from '@/components/ui/StarRating';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-cream-200 text-xs font-semibold text-rosewood-800 mb-3 shadow-soft-sm">
            <Heart size={13} className="text-rosewood-500 fill-rosewood-500" />
            <span>Community Love &amp; Verified Reviews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Loved by 12,000+ Mindful Planners &amp; Pet Parents
          </h2>

          <p className="text-sm sm:text-base text-espresso-600 mt-3 leading-relaxed font-light">
            Real experiences from women who brought peace to their mornings, routines, and pet care.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={4.96} size={16} />
            <span className="text-xs font-bold text-espresso-900">4.96 out of 5 stars</span>
            <span className="text-xs text-espresso-500">• 1,240+ 5-star customer reviews</span>
          </div>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-cream-50 rounded-3xl p-6 border border-cream-200/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} size={13} />
                  <span className="text-[11px] text-espresso-400 font-mono">
                    {review.date}
                  </span>
                </div>

                <h3 className="font-serif text-base font-medium text-espresso-950 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs text-espresso-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-200/70 flex items-center gap-3">
                {review.avatarUrl ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-cream-300">
                    <Image
                      src={review.avatarUrl}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-rosewood-100 text-rosewood-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {review.author[0]}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-espresso-900 truncate">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span title="Verified Purchase">
                        <CheckCircle
                          size={12}
                          className="text-emerald-600 shrink-0"
                        />
                      </span>
                    )}
                  </div>
                  {review.productTitle && (
                    <p className="text-[10px] text-espresso-400 truncate">
                      {review.productTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
