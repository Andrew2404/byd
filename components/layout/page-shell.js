import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StickyContactCta } from '@/components/layout/sticky-contact-cta';

export function PageShell({ locale, path, children }) {
  return (
    <>
      <Header locale={locale} path={path} />
      <main>{children}</main>
      <Footer locale={locale} />
      <StickyContactCta locale={locale} />
    </>
  );
}
