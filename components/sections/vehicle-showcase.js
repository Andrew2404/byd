import { SectionIntro } from '@/components/ui/section-intro';
import { VehicleCard } from '@/components/cards/vehicle-card';

export function VehicleShowcase({ locale, vehicles }) {
  return (
    <section className="container-shell py-20">
      <SectionIntro
        kicker="Featured vehicles"
        title="Discover the first BYD lineup for Georgia."
        description="Each product page is designed as a premium, scalable hub for exploration, 3D viewing, financing, and lead capture."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} locale={locale} />
        ))}
      </div>
    </section>
  );
}
