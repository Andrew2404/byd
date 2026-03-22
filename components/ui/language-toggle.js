import Link from 'next/link';
import { altLocale } from '@/lib/i18n';

export function LanguageToggle({ locale, path = '/' }) {
  const nextLocale = altLocale(locale);
  return (
    <Link
      href={`${path}?lang=${nextLocale}`}
      className="rounded-full border border-slate-300/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 transition hover:border-aurora hover:text-aurora dark:border-white/10 dark:text-slate-200"
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
