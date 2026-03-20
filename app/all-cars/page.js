import { PageShell } from '@/components/layout/page-shell';
import { CatalogBrowser } from '@/components/sections/catalog-browser';
import { vehicles } from '@/data/site';
import { resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return buildMetadata({ title: 'All Cars', description: 'Browse the premium BYD catalog in Georgia with filters, sorting, compare selection, and future-ready product architecture.', path: '/all-cars', locale });
}

export default function AllCarsPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/all-cars">
      <section className="container-shell py-16">
        <p className="section-kicker">Catalog</p>
        <h1 className="text-5xl font-semibold">All BYD Cars</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">Premium browsing UX with practical filtering, sorting, compare toggles, and scalable data structures for more models later.</p>
      </section>
      <CatalogBrowser vehicles={vehicles} locale={locale} />
    </PageShell>
  );
}
