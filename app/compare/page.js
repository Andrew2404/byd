import { PageShell } from '@/components/layout/page-shell';
import { CompareTool } from '@/components/sections/compare-tool';
import { vehicles } from '@/data/site';
import { resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return buildMetadata({ title: 'Compare Cars', description: 'Compare up to three BYD vehicles in Georgia with responsive table and card views plus shareable URL state.', path: '/compare', locale });
}

export default function ComparePage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  const initialModels = searchParams?.models?.split(',').filter(Boolean) || [];

  return (
    <PageShell locale={locale} path="/compare">
      <CompareTool vehicles={vehicles} locale={locale} initialModels={initialModels} />
    </PageShell>
  );
}
