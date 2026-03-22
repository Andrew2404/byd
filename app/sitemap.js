import { blogPosts, vehicles } from '@/data/site';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const staticRoutes = ['', '/all-cars', '/compare', '/about', '/contact', '/faq', '/charging', '/news', '/admin', '/legal/privacy-policy', '/legal/terms', '/legal/cookies', '/legal/disclaimer'];

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...vehicles.map((vehicle) => ({ url: `${baseUrl}/models/${vehicle.slug}`, lastModified: new Date() })),
    ...blogPosts.map((post) => ({ url: `${baseUrl}/news/${post.slug}`, lastModified: new Date(post.date) })),
  ];
}
