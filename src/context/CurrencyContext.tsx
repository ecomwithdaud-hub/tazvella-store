'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/types';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrencyCode: (code: Currency['code']) => void;
  formatPrice: (usdAmount: number) => string;
  currencies: Currency[];
}

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'CAD', symbol: 'CA$', rate: 1.36 },
  { code: 'AUD', symbol: 'AU$', rate: 1.52 },
];

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(CURRENCIES[0]);

  useEffect(() => {
    const saved = localStorage.getItem('tazvella_currency');
    if (saved) {
      const match = CURRENCIES.find((c) => c.code === saved);
      if (match) setCurrentCurrency(match);
    }
  }, []);

  const setCurrencyCode = (code: Currency['code']) => {
    const found = CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
    setCurrentCurrency(found);
    localStorage.setItem('tazvella_currency', code);
  };

  const formatPrice = (usdAmount: number): string => {
    const converted = usdAmount * currentCurrency.rate;
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrencyCode,
        formatPrice,
        currencies: CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
