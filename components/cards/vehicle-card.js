import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export function VehicleCard({ vehicle, locale }) {
  return (
    <article className="premium-card group overflow-hidden p-0">
      <div className="relative h-64 overflow-hidden">
        <Image src={vehicle.heroImage} alt={vehicle.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">BYD {vehicle.year}</p>
            <h3 className="text-3xl font-semibold text-white">{vehicle.name}</h3>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white">{vehicle.bodyType}</span>
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="grid grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div><p className="text-xs uppercase tracking-[0.2em]">Range</p><p className="mt-1 font-semibold">{vehicle.range} km*</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em]">Power</p><p className="mt-1 font-semibold">{vehicle.horsepower} hp*</p></div>
          <div><p className="text-xs uppercase tracking-[0.2em]">0-100</p><p className="mt-1 font-semibold">{vehicle.acceleration}s*</p></div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Starting from</p>
            <p className="text-2xl font-semibold">{formatCurrency(vehicle.price, locale === 'ka' ? 'ka-GE' : 'en-US')}</p>
          </div>
          <Link href={`/models/${vehicle.slug}?lang=${locale}`} className="secondary-button">Explore</Link>
        </div>
      </div>
    </article>
  );
}
