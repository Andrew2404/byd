import Link from 'next/link';
import { navigation } from '@/data/site';
import { t } from '@/lib/i18n';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';

export function Header({ locale, path = '/' }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink/80">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href={`/?lang=${locale}`} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora to-electric text-sm font-bold text-white shadow-glow">BYD</div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">GT Group</p>
            <p className="text-sm font-semibold">BYD Georgia</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={`${item.href}?lang=${locale}`} className="text-sm text-slate-700 transition hover:text-aurora dark:text-slate-300">
              {t(item.label, locale)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} path={path} />
          <ThemeToggle />
          <Link href={`/contact?lang=${locale}`} className="cta-button hidden sm:inline-flex">Contact Sales</Link>
        </div>
      </div>
    </header>
  );
}
