import { SectionIntro } from '@/components/ui/section-intro';
import { BlogCard } from '@/components/cards/blog-card';

export function EditorialGrid({ locale, posts }) {
  return (
    <section className="container-shell py-20">
      <SectionIntro kicker="News / Blog" title="Editorial content built for SEO and EV education." description="A bilingual-ready publishing structure helps GT Group explain BYD, build trust, and answer buyer questions across the funnel." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
