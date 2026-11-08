'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Gift,
  Tag,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    discountCode,
    discountPercent,
    discountAmount,
    finalTotal,
    applyDiscountCode,
    removeDiscountCode,
    bonusUnlocked,
    bonusProgress,
    amountNeededForBonus,
    setIsCheckoutOpen,
    addToCart,
  } = useCart();

  const { formatPrice } = useCurrency();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyDiscountCode(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-100 shadow-soft-xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-cream-200/80 bg-cream-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={19} className="text-espresso-800" />
              <h2 className="font-serif text-xl font-medium text-espresso-900">
                Your Digital Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rosewood-100 text-rosewood-800">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-espresso-400 hover:text-espresso-800 hover:bg-cream-200 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Bonus Free Gift Progress Bar */}
          <div className="bg-rosewood-50/80 px-6 py-3 border-b border-rosewood-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 font-medium text-rosewood-900">
                <Gift size={14} className="text-rosewood-600" />
                <span>
                  {bonusUnlocked
                    ? '🎉 Free Bonus Pack Unlocked!'
                    : `Add ${formatPrice(amountNeededForBonus)} more for Free Asset Bundle`}
                </span>
              </div>
              <span className="text-[11px] font-mono text-rosewood-700 font-semibold">
                {bonusProgress}%
              </span>
            </div>
            <div className="w-full bg-rosewood-200/70 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rosewood-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${bonusProgress}%` }}
              />
            </div>
            {bonusUnlocked && (
              <p className="text-[11px] text-rosewood-700 mt-1 font-medium">
                Includes 400+ Aesthetic Pet Stickers + Notion Banner Kit ($15 Value)
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-200 mx-auto flex items-center justify-center text-espresso-400">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-lg text-espresso-800">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-espresso-500 max-w-xs mx-auto">
                  Explore our aesthetic life planners, budget spreadsheets, and pet
                  parent dashboards to get started!
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Explore Digital Assets
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-cream-50 border border-cream-200/80 shadow-soft-sm group hover:border-cream-300 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-200 shrink-0">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-espresso-900 leading-snug truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-espresso-400 hover:text-rosewood-600 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <p className="text-[11px] text-espresso-500 capitalize mt-0.5">
                        {item.product.categoryLabel} • Instant Access
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-cream-300 rounded-full bg-cream-100 px-2 py-0.5 gap-2 text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="text-espresso-600 hover:text-espresso-950"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-mono font-medium text-espresso-900 min-w-[12px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="text-espresso-600 hover:text-espresso-950"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-sm text-espresso-950 font-mono">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* In-cart Cross-sell Bump Offer */}
            {items.length > 0 && !items.some((i) => i.product.id === 'prod-daily-glow-routines') && (
              <div className="p-3.5 rounded-2xl bg-sage-50/70 border border-sage-200/80 mt-2 flex items-center justify-between gap-3">
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-sage-900 block">
                    ✨ Add Daily Glow AM/PM Routine
                  </span>
                  <span className="text-espresso-600 text-[11px]">
                    Special add-on price: {formatPrice(9.0)} (Reg. $20)
                  </span>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: 'prod-daily-glow-routines',
                      slug: 'daily-glow-morning-evening-routine-notion-dashboard',
                      title: 'Daily Glow Morning & Evening Routine Notion Dashboard',
                      tagline: 'Cultivate peaceful mornings and cozy evenings.',
                      category: 'life',
                      categoryLabel: 'Life & Planning',
                      price: 9.0,
                      rating: 4.9,
                      reviewsCount: 114,
                      badges: [{ text: 'Add-on', variant: 'sage' }],
                      thumbnail:
                        'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80',
                      gallery: [],
                      description: 'Mini daily routine tracker.',
                      longDescription: [],
                      whatsIncluded: ['Daily Glow Notion Dashboard'],
                      features: [],
                      compatibility: ['notion'],
                      instantDownloadNotes: 'Delivered instantly.',
                    })
                  }
                  className="px-3 py-1.5 rounded-full bg-sage-600 hover:bg-sage-700 text-cream-50 text-xs font-semibold shadow-soft-sm transition-colors shrink-0"
                >
                  + Add
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 bg-cream-50/80 border-t border-cream-200 space-y-4">
              {/* Discount code box */}
              <div>
                {discountCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag size={13} className="text-emerald-600" />
                      <span>Code <strong>{discountCode}</strong> applied ({discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeDiscountCode}
                      className="text-espresso-400 hover:text-espresso-800 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (e.g. TAZVELLA30)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-cream-100 border border-cream-300 rounded-xl text-xs text-espresso-900 placeholder-espresso-400 focus:outline-none focus:border-espresso-600"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-espresso-800 hover:bg-espresso-900 text-cream-50 text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p
                    className={`text-[11px] mt-1 ${
                      couponMsg.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-espresso-700 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-espresso-950 pt-1 border-t border-cream-200">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base font-bold">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-between"
                onClick={handleProceedToCheckout}
              >
                <span>Proceed to Instant Checkout</span>
                <span className="flex items-center gap-1.5 font-mono">
                  {formatPrice(finalTotal)}
                  <ArrowRight size={16} />
                </span>
              </Button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-espresso-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-sage-600" />
                  Guaranteed Safe Checkout
                </span>
                <span>•</span>
                <span>Instant Cloud Download</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
