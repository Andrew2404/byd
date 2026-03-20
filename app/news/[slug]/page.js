import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell';
import { blogPosts } from '@/data/site';
import { resolveLocale, t } from '@/lib/i18n';

export default function NewsDetailPage({ params, searchParams }) {
  const locale = resolveLocale(searchParams);
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <PageShell locale={locale} path={`/news/${params.slug}`}>
      <article className="container-shell py-20">
        <p className="section-kicker">{t(post.category, locale)}</p>
        <h1 className="max-w-4xl text-5xl font-semibold">{t(post.title, locale)}</h1>
        <p className="mt-4 text-sm text-slate-500">{post.date}</p>
        <div className="premium-card mt-10 max-w-4xl text-base leading-8 text-slate-700 dark:text-slate-200">
          {t(post.body, locale)}
        </div>
      </article>
    </PageShell>
  );
}
