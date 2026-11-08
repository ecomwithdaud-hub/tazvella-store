import React from 'react';
import { cn } from '@/lib/utils';
import { ProductBadge } from '@/types';

interface BadgeProps {
  text: string;
  variant?: ProductBadge['variant'];
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({ text, variant = 'default', className, size = 'sm' }: BadgeProps) {
  const variantStyles = {
    rose: 'bg-rosewood-100 text-rosewood-800 border-rosewood-200',
    sage: 'bg-sage-100 text-sage-800 border-sage-200',
    caramel: 'bg-caramel-100 text-caramel-800 border-caramel-200',
    lavender: 'bg-lavender-100 text-lavender-800 border-lavender-200',
    default: 'bg-cream-200 text-espresso-700 border-cream-300',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium tracking-wide',
    md: 'text-sm px-3 py-1 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-colors shadow-soft-sm',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {text}
    </span>
  );
}
