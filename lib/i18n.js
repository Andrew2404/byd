export const locales = ['ka', 'en'];
export const defaultLocale = 'ka';

export function resolveLocale(searchParams) {
  const locale = searchParams?.lang;
  return locales.includes(locale) ? locale : defaultLocale;
}

export function t(value, locale = defaultLocale) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] ?? value[defaultLocale] ?? Object.values(value)[0] ?? '';
}

export function altLocale(locale) {
  return locale === 'ka' ? 'en' : 'ka';
}
