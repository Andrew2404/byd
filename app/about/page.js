import { PageShell } from '@/components/layout/page-shell';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { resolveLocale } from '@/lib/i18n';

const aboutItems = [
  { title: { ka: 'ექსკლუზიური წარმომადგენლობა', en: 'Exclusive representation' }, description: { ka: 'GT Group builds the local sales, service, and education ecosystem for BYD in Georgia.', en: 'GT Group builds the local sales, service, and education ecosystem for BYD in Georgia.' } },
  { title: { ka: 'პრემიუმ მომსახურება', en: 'Premium support' }, description: { ka: 'From showroom discovery to aftersales confidence, the experience is designed to feel elevated and clear.', en: 'From showroom discovery to aftersales confidence, the experience is designed to feel elevated and clear.' } },
  { title: { ka: 'გრძელვადიანი პლატფორმა', en: 'Long-term platform' }, description: { ka: 'The website architecture supports future models, real CMS workflows, and richer ownership services.', en: 'The website architecture supports future models, real CMS workflows, and richer ownership services.' } },
];

export default function AboutPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/about">
      <section className="container-shell py-20">
        <p className="section-kicker">About us</p>
        <h1 className="text-5xl font-semibold">GT Group, presenting BYD in Georgia.</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600 dark:text-slate-300">A premium, trust-building destination for EV education, model discovery, and long-term ownership confidence.</p>
      </section>
      <FeatureGrid locale={locale} kicker="Dealer vision" title="Luxury tone, practical operations, scalable execution." description="This page introduces the exclusive dealership positioning while staying credible and maintainable." items={aboutItems} />
    </PageShell>
  );
}
