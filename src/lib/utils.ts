import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currencyCode: string = 'USD', rate: number = 1): string {
  const converted = amount * rate;
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'AU$',
  };

  const symbol = symbols[currencyCode] || '$';
  return `${symbol}${converted.toFixed(2)}`;
}

export function calculateDiscount(current: number, original?: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
