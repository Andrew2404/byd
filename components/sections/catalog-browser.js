'use client';

import { useMemo, useState } from 'react';
import { VehicleCard } from '@/components/cards/vehicle-card';

export function CatalogBrowser({ vehicles, locale }) {
  const [filters, setFilters] = useState({ bodyType: 'all', price: 'all', range: 'all', seating: 'all', performance: 'all' });
  const [sort, setSort] = useState('price-asc');
  const [compare, setCompare] = useState([]);

  const filteredVehicles = useMemo(() => {
    const list = vehicles.filter((vehicle) => {
      if (filters.bodyType !== 'all' && vehicle.bodyType !== filters.bodyType) return false;
      if (filters.price === 'under-100' && vehicle.price >= 100000) return false;
      if (filters.price === '100-140' && (vehicle.price < 100000 || vehicle.price > 140000)) return false;
      if (filters.price === '140-plus' && vehicle.price <= 140000) return false;
      if (filters.range === '450-plus' && vehicle.range < 450) return false;
      if (filters.range === '500-plus' && vehicle.range < 500) return false;
      if (filters.seating !== 'all' && String(vehicle.seating) !== filters.seating) return false;
      if (filters.performance !== 'all' && vehicle.filters.performanceTier !== filters.performance) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      const [field, direction] = sort.split('-');
      const fieldMap = { price: 'price', range: 'range', performance: 'horsepower' };
      const diff = a[fieldMap[field]] - b[fieldMap[field]];
      return direction === 'asc' ? diff : -diff;
    });
  }, [vehicles, filters, sort]);

  const toggleCompare = (slug) => {
    setCompare((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current));
  };

  const resetFilters = () => {
    setFilters({ bodyType: 'all', price: 'all', range: 'all', seating: 'all', performance: 'all' });
    setSort('price-asc');
  };

  return (
    <section className="container-shell py-16">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="premium-card h-fit space-y-5 lg:sticky lg:top-28">
          <div>
            <p className="section-kicker">Filter inventory</p>
            <h2 className="text-2xl font-semibold">Premium catalog controls</h2>
          </div>
          {[
            ['bodyType', 'Body type', ['all', 'Sedan', 'Hatchback', 'SUV']],
            ['price', 'Price', ['all', 'under-100', '100-140', '140-plus']],
            ['range', 'Range', ['all', '450-plus', '500-plus']],
            ['seating', 'Seating', ['all', '5']],
            ['performance', 'Performance', ['all', 'urban', 'mid', 'high']],
          ].map(([key, label, options]) => (
            <label key={key} className="block text-sm font-medium">
              {label}
              <select value={filters[key]} onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/10">
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <label className="block text-sm font-medium">
            Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/10">
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="range-desc">Range ↓</option>
              <option value="performance-desc">Performance ↓</option>
            </select>
          </label>
          <button type="button" onClick={resetFilters} className="secondary-button w-full">Reset filters</button>
        </aside>
        <div className="space-y-6">
          <div className="premium-card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">{filteredVehicles.length} models found</p>
              <h3 className="text-2xl font-semibold">Compare shortlist: {compare.join(', ') || 'None selected'}</h3>
            </div>
            <a href={`/compare?lang=${locale}&models=${compare.join(',')}`} className="cta-button">Open compare</a>
          </div>
          {filteredVehicles.length ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.slug} className="space-y-4">
                  <VehicleCard vehicle={vehicle} locale={locale} />
                  <button type="button" onClick={() => toggleCompare(vehicle.slug)} className="secondary-button w-full">
                    {compare.includes(vehicle.slug) ? 'Remove from compare' : 'Add to compare'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="premium-card text-center">
              <h3 className="text-2xl font-semibold">No vehicles match these filters</h3>
              <p className="mt-3 text-sm text-slate-500">Try widening body type, price, or range filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
