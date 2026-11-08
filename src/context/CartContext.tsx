'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  bonusGoalThreshold: number;
  bonusUnlocked: boolean;
  bonusProgress: number;
  amountNeededForBonus: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const BONUS_GOAL = 35.0; // Free Aesthetic Digital Asset Bundle when cart >= $35

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tazvella_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCode = localStorage.getItem('tazvella_discount');
      if (savedCode) {
        if (savedCode.toUpperCase() === 'TAZVELLA30') {
          setDiscountCode('TAZVELLA30');
          setDiscountPercent(30);
        } else if (savedCode.toUpperCase() === 'WELCOME15') {
          setDiscountCode('WELCOME15');
          setDiscountPercent(15);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tazvella_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('tazvella_cart');
  };

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TAZVELLA30') {
      setDiscountCode('TAZVELLA30');
      setDiscountPercent(30);
      localStorage.setItem('tazvella_discount', 'TAZVELLA30');
      return { success: true, message: 'Spring 30% OFF applied!' };
    }
    if (clean === 'WELCOME15' || clean === 'VIP15') {
      setDiscountCode(clean);
      setDiscountPercent(15);
      localStorage.setItem('tazvella_discount', clean);
      return { success: true, message: '15% Welcome Discount applied!' };
    }
    return { success: false, message: 'Invalid or expired code. Try TAZVELLA30' };
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    localStorage.removeItem('tazvella_discount');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const bonusUnlocked = subtotal >= BONUS_GOAL;
  const bonusProgress = Math.min(100, Math.round((subtotal / BONUS_GOAL) * 100));
  const amountNeededForBonus = Math.max(0, BONUS_GOAL - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        totalItems,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        finalTotal,
        applyDiscountCode,
        removeDiscountCode,
        bonusGoalThreshold: BONUS_GOAL,
        bonusUnlocked,
        bonusProgress,
        amountNeededForBonus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
