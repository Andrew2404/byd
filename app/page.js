import { PageShell } from '@/components/layout/page-shell';
import { Hero } from '@/components/sections/hero';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { VehicleShowcase } from '@/components/sections/vehicle-showcase';
import { CtaBanners } from '@/components/sections/cta-banners';
import { EditorialGrid } from '@/components/sections/editorial-grid';
import { ContactStrip } from '@/components/forms/contact-strip';
import { blogPosts, educationSections, homepageContent, vehicles } from '@/data/site';
import { resolveLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata({ searchParams }) {
  const locale = resolveLocale(searchParams);

  return buildMetadata({ title: 'Premium Electric Mobility', description: 'Explore BYD in Georgia with premium EV storytelling, model pages, comparison, and configurator-ready architecture.', path: '/', locale });
}

export default function HomePage({ searchParams }) {
  const locale = resolveLocale(searchParams);


  return (
    <PageShell locale={locale} path="/">
      <Hero locale={locale} hero={homepageContent.hero} />
      <VehicleShowcase locale={locale} vehicles={vehicles} />
      <FeatureGrid locale={locale} kicker="Why BYD" title="Technology credibility, battery leadership, and premium support." description="Designed to help first-time EV buyers quickly understand why BYD matters." items={homepageContent.whyByd} />
      <FeatureGrid locale={locale} kicker="Why EV" title="Electric ownership, explained with clarity and confidence." description="A sales-driven but trustworthy educational structure for Georgia’s emerging EV audience." items={homepageContent.whyEv} />
      <FeatureGrid locale={locale} kicker="Battery / Charging / Ownership" title="Education-led sections that remove buyer uncertainty." description="Charging simplicity, warranty, service, and EV myths are built into the homepage funnel." items={educationSections.map((item) => ({ title: item.title, description: item.description }))} />
      <CtaBanners locale={locale} items={homepageContent.banners} />
      <EditorialGrid locale={locale} posts={blogPosts} />
      <ContactStrip vehicles={vehicles} title="Talk to BYD Georgia sales" description="Request a quote, financing guidance, or a showroom consultation without leaving the page." />
    </PageShell>
  );
}
