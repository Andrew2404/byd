export function buildMetadata({ title, description, path = '', locale = 'ka' }) {
  const baseTitle = 'BYD Georgia | GT Group';
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        ka: `${baseUrl}${path}?lang=ka`,
        en: `${baseUrl}${path}?lang=en`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${baseUrl}${path}`,
      locale,
      type: 'website',
    },
  };
}
