import { formatCurrency } from '@/lib/utils';

export function SpecGrid({ vehicle, locale }) {
  const specs = [
    ['Price', formatCurrency(vehicle.price, locale === 'ka' ? 'ka-GE' : 'en-US')],
    ['Range', `${vehicle.range} km*`],
    ['Battery', `${vehicle.battery} kWh*`],
    ['Horsepower', `${vehicle.horsepower} hp*`],
    ['Acceleration', `${vehicle.acceleration}s*`],
    ['Drivetrain', vehicle.drivetrain],
    ['Top speed', vehicle.topSpeed],
    ['Dimensions', vehicle.dimensions],
    ['Cargo', `${vehicle.cargo} L*`],
    ['Seating', `${vehicle.seating}`],
    ['Charging', vehicle.charging],
    ['Warranty', vehicle.warranty],
  ];

  return (
    <section className="container-shell py-20">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Specs overview</p>
          <h2 className="section-title">All the key ownership data in one refined view.</h2>
        </div>
        <p className="max-w-2xl text-sm text-slate-500">{vehicle.placeholderNote}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {specs.map(([label, value]) => (
          <div key={label} className="premium-card">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-3 text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
