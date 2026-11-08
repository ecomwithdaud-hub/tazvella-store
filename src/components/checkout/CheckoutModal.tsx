'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  X,
  Lock,
  ShieldCheck,
  CheckCircle,
  CreditCard,
  Zap,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotal,
    discountCode,
    discountAmount,
    finalTotal,
    clearCart,
  } = useCart();

  const { formatPrice } = useCurrency();
  const router = useRouter();

  const [checkoutMode, setCheckoutMode] = useState<'express' | 'shopify'>('express');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay'>('applepay');

  if (!isCheckoutOpen) return null;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email for instant digital delivery.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      // Store completed order info in session storage
      sessionStorage.setItem(
        'tazvella_last_order',
        JSON.stringify({
          orderId: `TZ-${Math.floor(100000 + Math.random() * 900000)}`,
          email,
          firstName: firstName || 'Valued Customer',
          items,
          total: finalTotal,
          date: new Date().toLocaleDateString(),
        })
      );
      clearCart();
      router.push('/checkout/success');
    }, 1200);
  };

  const handleShopifyRedirect = () => {
    setIsProcessing(true);
    // Simulating Shopify Storefront API cart checkout creation
    setTimeout(() => {
      setIsProcessing(false);
      // In production: window.location.href = `https://checkout.tazvella.com/cart/${items.map(i => `${i.product.id}:${i.quantity}`).join(',')}`;
      alert(
        `[Shopify Storefront Integration Stub]\n\nIn production, this redirects directly to Shopify Checkout at:\nhttps://checkout.tazvella.com/cart/${items
          .map((i) => `${i.product.id}:${i.quantity}`)
          .join(',')}\n\nProceeding with Instant Demo Checkout fulfillment.`
      );
      setCheckoutMode('express');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-espresso-950/75 backdrop-blur-md transition-opacity"
          onClick={() => setIsCheckoutOpen(false)}
        />

        <div className="relative transform overflow-hidden rounded-3xl bg-cream-50 text-left shadow-soft-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-cream-200">
          {/* Header */}
          <div className="px-6 py-4 bg-espresso-950 text-cream-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-emerald-400" />
              <span className="font-serif text-lg font-medium tracking-wide">
                Secure Express Digital Checkout
              </span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="text-espresso-400 hover:text-cream-100 transition-colors p-1"
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Mode Switcher Stub (Express vs Shopify Storefront) */}
            <div className="flex items-center justify-center p-1 bg-cream-200 rounded-full text-xs font-medium max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => setCheckoutMode('express')}
                className={`flex-1 py-1.5 px-3 rounded-full transition-all ${
                  checkoutMode === 'express'
                    ? 'bg-espresso-900 text-cream-50 shadow-soft-sm'
                    : 'text-espresso-700 hover:text-espresso-900'
                }`}
              >
                Instant Cloud Checkout
              </button>
              <button
                type="button"
                onClick={() => setCheckoutMode('shopify')}
                className={`flex-1 py-1.5 px-3 rounded-full transition-all ${
                  checkoutMode === 'shopify'
                    ? 'bg-espresso-900 text-cream-50 shadow-soft-sm'
                    : 'text-espresso-700 hover:text-espresso-900'
                }`}
              >
                Shopify / Stripe Stub
              </button>
            </div>

            {/* Order Items Preview */}
            <div className="bg-cream-100/70 p-4 rounded-2xl border border-cream-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-espresso-500">
                <span>Items in your order ({items.length})</span>
                <span className="font-mono text-espresso-950">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-cream-300">
                        <Image
                          src={item.product.thumbnail}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <span className="font-medium text-espresso-900 truncate">
                        {item.product.title} (x{item.quantity})
                      </span>
                    </div>
                    <span className="font-mono font-medium text-espresso-900 ml-2">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-emerald-700 font-medium pt-2 border-t border-cream-200">
                  <span>Applied Promo Code ({discountCode})</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
            </div>

            {checkoutMode === 'shopify' ? (
              /* Shopify Storefront Redirection Info */
              <div className="space-y-4 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-espresso-800 text-xs">
                <div className="flex items-start gap-3">
                  <ExternalLink size={18} className="text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-950 text-sm">
                      Shopify Storefront API Integration
                    </h4>
                    <p className="mt-1 leading-relaxed text-amber-900">
                      When connected to your Shopify Plus or Hydrogen storefront, clicking checkout creates a native Shopify Checkout session via GraphQL Storefront API (`cartCreate` / `checkoutCreate`) with direct webhook fulfillment for digital downloads.
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={isProcessing}
                  onClick={handleShopifyRedirect}
                >
                  Redirect to Shopify Checkout URL
                </Button>
              </div>
            ) : (
              /* Express Instant Checkout Form */
              <form onSubmit={handleSimulatePayment} className="space-y-4">
                {/* Instant Delivery Email Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
                    1. Delivery Email Address (Instant Digital Access)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-espresso-900"
                  />
                  <p className="text-[11px] text-espresso-500 mt-1">
                    Your duplicate Notion links, iPad PDFs, and video guides will be sent here immediately.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-espresso-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-cream-100 border border-cream-300 text-sm text-espresso-950 placeholder-espresso-400 focus:outline-none focus:border-espresso-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-espresso-700 mb-1">
                      Billing Country
                    </label>
                    <select className="w-full px-3.5 py-2 rounded-xl bg-cream-100 border border-cream-300 text-sm text-espresso-950 focus:outline-none focus:border-espresso-900">
                      <option>United States (USD)</option>
                      <option>United Kingdom (GBP)</option>
                      <option>Canada (CAD)</option>
                      <option>Australia (AUD)</option>
                      <option>European Union (EUR)</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-2">
                    2. Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'applepay'
                          ? 'border-espresso-900 bg-espresso-900 text-cream-50 shadow-soft-sm'
                          : 'border-cream-300 bg-cream-100 text-espresso-800 hover:bg-cream-200'
                      }`}
                    >
                      <span> Pay / Google Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-espresso-900 bg-espresso-900 text-cream-50 shadow-soft-sm'
                          : 'border-cream-300 bg-cream-100 text-espresso-800 hover:bg-cream-200'
                      }`}
                    >
                      <CreditCard size={15} />
                      <span>Credit Card</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3.5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2.5 text-xs">
                    <input
                      type="text"
                      placeholder="Card number •••• •••• •••• 4242"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-espresso-900 text-xs font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-espresso-900 text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="888"
                        className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-lg text-espresso-900 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* Final Checkout Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center mt-2"
                  isLoading={isProcessing}
                >
                  <Lock size={15} />
                  <span>
                    Complete Order & Access Downloads • {formatPrice(finalTotal)}
                  </span>
                </Button>

                {/* Guarantee */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-espresso-500 pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-sage-600" />
                    256-bit Encrypted
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Zap size={12} className="text-caramel-500" />
                    Instant Access
                  </span>
                  <span>•</span>
                  <span>30-Day Happiness Guarantee</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
