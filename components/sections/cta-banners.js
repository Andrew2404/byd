import Link from 'next/link';
import { t } from '@/lib/i18n';

export function CtaBanners({ locale, items }) {
  return (
    <section className="container-shell py-20">
      <div className="grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.href} className="premium-card flex flex-col justify-between gap-5 rounded-[2rem] bg-gradient-to-br from-slate-950 to-slate-800 text-white dark:border-white/10">
            <div>
              <p className="section-kicker !border-white/20 !bg-white/10 !text-white/80">Explore</p>
              <h3 className="text-3xl font-semibold">{t(item.title, locale)}</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">{t(item.description, locale)}</p>
            </div>
            <div>
              <Link href={`${item.href}?lang=${locale}`} className="cta-button">Open</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
