import { PageShell } from '@/components/layout/page-shell';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { educationSections } from '@/data/site';
import { resolveLocale } from '@/lib/i18n';

export default function ChargingPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/charging">
      <section className="container-shell py-20">
        <p className="section-kicker">EV education</p>
        <h1 className="text-5xl font-semibold">Charging, battery, warranty, and EV confidence.</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600 dark:text-slate-300">Education-led content for customers who are new to BYD and electric mobility in Georgia.</p>
      </section>
      <FeatureGrid locale={locale} kicker="Ownership guide" title="Sales-oriented education without the pressure." description="Structured to reduce uncertainty and move users toward model exploration or consultation." items={educationSections.map((item) => ({ title: item.title, description: item.description }))} />
    </PageShell>
  );
}
