import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { GalleryStrip } from '@/components/sections/gallery-strip';
import { SpecGrid } from '@/components/sections/spec-grid';
import { ConfiguratorPanel } from '@/components/three/configurator-panel';
import { ContactStrip } from '@/components/forms/contact-strip';
import { vehicles } from '@/data/site';
import { resolveLocale, t } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export function generateMetadata({ params, searchParams }) {
  const locale = resolveLocale(searchParams);
  const vehicle = vehicles.find((item) => item.slug === params.slug);
  if (!vehicle) return {};
  return buildMetadata({ title: vehicle.name, description: vehicle.description[locale], path: `/models/${params.slug}`, locale });
}

export default function ModelDetailPage({ params, searchParams }) {
  const locale = resolveLocale(searchParams);
  const vehicle = vehicles.find((item) => item.slug === params.slug);
  if (!vehicle) notFound();

  return (
    <PageShell locale={locale} path={`/models/${params.slug}`}>
      <section className="relative overflow-hidden border-b border-slate-200/70 dark:border-white/10">
        <div className="absolute inset-0">
          <Image src={vehicle.heroImage} alt={vehicle.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/30" />
        </div>
        <div className="container-shell relative grid min-h-[78vh] items-end gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl text-white">
            <p className="section-kicker !border-white/20 !bg-white/10 !text-white/80">BYD {vehicle.year}</p>
            <h1 className="text-6xl font-semibold tracking-tight">{vehicle.name}</h1>
            <p className="mt-5 text-lg leading-8 text-white/75">{vehicle.description[locale]}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#configurator" className="cta-button">Show 3D</Link>
              <Link href={`/compare?lang=${locale}&models=${vehicle.slug}`} className="secondary-button !border-white/30 !text-white">Compare</Link>
            </div>
          </div>
          <div className="premium-card self-end bg-white/10 text-white backdrop-blur-md dark:border-white/10 dark:bg-white/10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Starting from</p>
            <p className="mt-3 text-4xl font-semibold">{formatCurrency(vehicle.price, locale === 'ka' ? 'ka-GE' : 'en-US')}</p>
            <p className="mt-4 text-sm text-white/70">{vehicle.financeDisclaimer[locale]}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-white/60">Range</p><p className="mt-1 font-semibold">{vehicle.range} km*</p></div>
              <div><p className="text-white/60">Power</p><p className="mt-1 font-semibold">{vehicle.horsepower} hp*</p></div>
              <div><p className="text-white/60">Battery</p><p className="mt-1 font-semibold">{vehicle.battery} kWh*</p></div>
              <div><p className="text-white/60">0–100</p><p className="mt-1 font-semibold">{vehicle.acceleration}s*</p></div>
            </div>
          </div>
        </div>
      </section>
      <GalleryStrip vehicle={vehicle} />
      <SpecGrid vehicle={vehicle} locale={locale} />
      <section id="configurator">
        <ConfiguratorPanel vehicle={vehicle} locale={locale} />
      </section>
      <section className="container-shell py-20">
        <div className="mb-8">
          <p className="section-kicker">Highlights / ownership</p>
          <h2 className="section-title">Feature storytelling, charging clarity, and service confidence.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {vehicle.highlights.map((item) => (
            <article key={t(item.title, 'en')} className="premium-card">
              <h3 className="text-xl font-semibold">{t(item.title, locale)}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{t(item.description, locale)}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="premium-card"><h3 className="text-xl font-semibold">Charging / EV</h3><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{vehicle.charging}. Ownership education modules can later connect to local charger maps and trip-planning tools.</p></div>
          <div className="premium-card"><h3 className="text-xl font-semibold">Warranty / Service</h3><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{vehicle.warranty}. GT Group support architecture is positioned near every model’s pricing and lead CTA.</p></div>
          <div className="premium-card"><h3 className="text-xl font-semibold">Actions</h3><div className="mt-4 flex flex-wrap gap-3"><Link href={`/contact?lang=${locale}`} className="cta-button">Request quote</Link><Link href={`/contact?lang=${locale}`} className="secondary-button">Financing inquiry</Link></div></div>
        </div>
      </section>
      <ContactStrip vehicles={vehicles} type="quote" title={`Request a quote for ${vehicle.name}`} description="Short, premium lead flow for pricing, financing, or test-drive requests." />
    </PageShell>
  );
}
