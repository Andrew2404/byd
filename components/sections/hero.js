import Link from 'next/link';
import { t } from '@/lib/i18n';

export function Hero({ locale, hero }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-hero-grid dark:border-white/10">
      <div className="container-shell grid min-h-[78vh] items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-kicker">{t(hero.eyebrow, locale)}</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">{t(hero.title, locale)}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{t(hero.description, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/all-cars?lang=${locale}`} className="cta-button">Explore Models</Link>
            <Link href={`/compare?lang=${locale}`} className="secondary-button">Compare BYD</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {hero.metrics.map((metric) => (
              <div key={metric.value} className="premium-card p-5">
                <p className="text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-500">{t(metric.label, locale)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-electric/20 blur-3xl" />
          <div className="premium-card relative overflow-hidden rounded-[2rem] p-0">
            <div className="absolute inset-0 bg-gradient-to-br from-aurora/20 via-transparent to-electric/10" />
            <div className="grid min-h-[560px] place-items-center bg-[radial-gradient(circle_at_top,rgba(82,211,255,0.18),transparent_36%),linear-gradient(180deg,#0f172a,#020617)] p-10 text-white">
              <div className="space-y-8 text-center">
                <div className="mx-auto flex h-28 w-28 animate-float items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 text-4xl font-semibold">EV</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-white/60">Premium launch platform</p>
                  <h2 className="mt-4 text-4xl font-semibold">Future-facing automotive UX</h2>
                </div>
                <p className="max-w-lg text-sm leading-7 text-white/70">Cinematic storytelling, rich comparison flows, premium forms, and scalable configurator architecture — all designed for a one-developer roadmap to production.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
