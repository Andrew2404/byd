import Link from 'next/link';
import { navigation, siteSettings } from '@/data/site';
import { t } from '@/lib/i18n';

export function Footer({ locale }) {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50 py-14 dark:border-white/10 dark:bg-black">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="section-kicker">GT Group × BYD</p>
          <h2 className="text-2xl font-semibold">Premium electric mobility, tailored for Georgia.</h2>
          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
            BYD Georgia is presented as a future-ready sales and education platform with premium lead capture, configurator architecture, and scalable content operations.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Navigation</h3>
          <ul className="space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={`${item.href}?lang=${locale}`} className="text-slate-700 transition hover:text-aurora dark:text-slate-300">
                  {t(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>{siteSettings.phone}</p>
          <p>{siteSettings.email}</p>
          <p>{t(siteSettings.address, locale)}</p>
          <p>{t(siteSettings.hours, locale)}</p>
          <div className="flex flex-wrap gap-3 pt-4 text-xs uppercase tracking-[0.2em]">
            <Link href={`/legal/privacy-policy?lang=${locale}`}>Privacy</Link>
            <Link href={`/legal/terms?lang=${locale}`}>Terms</Link>
            <Link href={`/legal/cookies?lang=${locale}`}>Cookies</Link>
            <Link href={`/legal/disclaimer?lang=${locale}`}>Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
