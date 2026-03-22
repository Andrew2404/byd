import { PageShell } from '@/components/layout/page-shell';
import { ContactStrip } from '@/components/forms/contact-strip';
import { siteSettings, vehicles } from '@/data/site';
import { resolveLocale, t } from '@/lib/i18n';

export default function ContactPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/contact">
      <section className="container-shell grid gap-8 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-card">
          <p className="section-kicker">Contact</p>
          <h1 className="text-4xl font-semibold">Talk to BYD Georgia.</h1>
          <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>{siteSettings.phone}</p>
            <p>{siteSettings.email}</p>
            <p>{t(siteSettings.address, locale)}</p>
            <p>{t(siteSettings.hours, locale)}</p>
            <p>WhatsApp: {siteSettings.whatsapp}</p>
            <p>Mock map placeholder and service/support details can be inserted here later.</p>
          </div>
        </div>
        <ContactStrip vehicles={vehicles} title="Contact us" description="Elegant lead form with backend validation, Zoho-ready submission flow, and on-page success state." />
      </section>
    </PageShell>
  );
}
