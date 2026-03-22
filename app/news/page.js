import { PageShell } from '@/components/layout/page-shell';
import { EditorialGrid } from '@/components/sections/editorial-grid';
import { blogPosts } from '@/data/site';
import { resolveLocale } from '@/lib/i18n';

export default function NewsPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  return (
    <PageShell locale={locale} path="/news">
      <section className="container-shell py-20">
        <p className="section-kicker">News / Blog</p>
        <h1 className="text-5xl font-semibold">Editorial content for trust, SEO, and EV adoption.</h1>
      </section>
      <EditorialGrid locale={locale} posts={blogPosts} />
    </PageShell>
  );
}
