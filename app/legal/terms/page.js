import { PageShell } from '@/components/layout/page-shell';
import { legalContent } from '@/data/site';
import { resolveLocale, t } from '@/lib/i18n';

export default function TermsPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/legal/terms">
      <section className="container-shell py-20"><div className="premium-card"><p className="section-kicker">Legal</p><h1 className="text-4xl font-semibold">{t(legalContent.terms.title, locale)}</h1><p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{t(legalContent.terms.body, locale)}</p></div></section>
    </PageShell>
  );
}
