import { SectionIntro } from '@/components/ui/section-intro';
import { t } from '@/lib/i18n';

export function FeatureGrid({ locale, kicker, title, description, items }) {
  return (
    <section className="container-shell py-20">
      <SectionIntro kicker={kicker} title={title} description={description} />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={t(item.title, 'en')} className="premium-card">
            <h3 className="text-xl font-semibold">{t(item.title, locale)}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{t(item.description, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
