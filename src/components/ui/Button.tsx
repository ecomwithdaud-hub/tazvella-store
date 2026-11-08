'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'caramel';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-espresso-900 text-cream-50 hover:bg-espresso-800 shadow-soft hover:shadow-soft-lg active:scale-[0.98] focus:ring-espresso-800',
    secondary:
      'bg-rosewood-100 text-rosewood-900 hover:bg-rosewood-200 border border-rosewood-200 shadow-soft-sm active:scale-[0.98] focus:ring-rosewood-300',
    caramel:
      'bg-caramel-500 text-cream-50 hover:bg-caramel-600 shadow-soft active:scale-[0.98] focus:ring-caramel-400',
    outline:
      'border border-espresso-300 text-espresso-800 hover:bg-cream-200 hover:border-espresso-400 active:scale-[0.98] focus:ring-espresso-200',
    ghost:
      'text-espresso-700 hover:bg-cream-200 active:scale-[0.98] focus:ring-cream-300',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 tracking-wide',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
