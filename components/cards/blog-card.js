import Link from 'next/link';
import { t } from '@/lib/i18n';

export function BlogCard({ post, locale }) {
  return (
    <article className="premium-card flex h-full flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-aurora">{t(post.category, locale)}</p>
        <h3 className="mt-4 text-2xl font-semibold">{t(post.title, locale)}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{t(post.excerpt, locale)}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-500">{post.date}</span>
        <Link href={`/news/${post.slug}?lang=${locale}`} className="secondary-button">Read</Link>
      </div>
    </article>
  );
}
