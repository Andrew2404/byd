import Link from 'next/link';

export function StickyContactCta({ locale }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:inset-x-auto md:right-6">
      <Link href={`/contact?lang=${locale}`} className="cta-button w-full md:w-auto">
        Contact Sales
      </Link>
    </div>
  );
}
