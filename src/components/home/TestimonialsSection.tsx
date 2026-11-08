'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle, Heart } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { StarRating } from '@/components/ui/StarRating';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-8 sm:py-20 bg-cream-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        {/* Section Header - Compressed on mobile */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-cream-200 text-[11px] sm:text-xs font-semibold text-rosewood-800 mb-2 shadow-soft-sm">
            <Heart size={12} className="text-rosewood-500 fill-rosewood-500" />
            <span>Community Love</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-espresso-950 font-medium tracking-tight">
            Loved by 12,000+ Mindful Planners &amp; Pet Parents
          </h2>

          <div className="flex items-center justify-center gap-2 mt-2">
            <StarRating rating={4.96} size={14} />
            <span className="text-xs font-bold text-espresso-900">4.96/5</span>
            <span className="text-xs text-espresso-500">(1,240+ 5-star reviews)</span>
          </div>
        </div>

        {/* Reviews Grid: Horizontal swipe carousel on mobile, 4-col on desktop! */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2.5 pb-2 -mx-2.5 px-2.5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="w-[80vw] sm:w-auto shrink-0 snap-center bg-cream-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-cream-200/90 shadow-soft-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} size={12} />
                  <span className="text-[10px] sm:text-[11px] text-espresso-400 font-mono">
                    {review.date}
                  </span>
                </div>

                <h3 className="font-serif text-sm sm:text-base font-medium text-espresso-950 leading-snug line-clamp-1">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs text-espresso-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {review.comment}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-cream-200/70 flex items-center gap-2.5">
                {review.avatarUrl ? (
                  <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 border border-cream-300">
                    <Image
                      src={review.avatarUrl}
                      alt={review.author}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                ) : (
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-rosewood-100 text-rosewood-800 flex items-center justify-center font-bold text-xs shrink-0">
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
                          size={11}
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
