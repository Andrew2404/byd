import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value, locale = 'ka-GE', currency = 'GEL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value, locale = 'ka-GE') {
  return new Intl.NumberFormat(locale).format(value);
}

export function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}
