import { PageShell } from '@/components/layout/page-shell';
import { legalContent } from '@/data/site';
import { resolveLocale, t } from '@/lib/i18n';

export default function DisclaimerPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/legal/disclaimer">
      <section className="container-shell py-20"><div className="premium-card"><p className="section-kicker">Legal</p><h1 className="text-4xl font-semibold">{t(legalContent.disclaimer.title, locale)}</h1><p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{t(legalContent.disclaimer.body, locale)}</p></div></section>
    </PageShell>
  );
}
