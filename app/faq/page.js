import { PageShell } from '@/components/layout/page-shell';
import { faqItems } from '@/data/site';
import { resolveLocale, t } from '@/lib/i18n';

export default function FaqPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/faq">
      <section className="container-shell py-20">
        <p className="section-kicker">FAQ</p>
        <h1 className="text-5xl font-semibold">Common EV questions, answered clearly.</h1>
        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details key={t(item.question, 'en')} className="premium-card group">
              <summary className="cursor-pointer list-none text-xl font-semibold">{t(item.question, locale)}</summary>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{t(item.answer, locale)}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
