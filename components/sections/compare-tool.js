'use client';

import { useMemo, useState } from 'react';
import { compareFields } from '@/data/site';
import { t } from '@/lib/i18n';

export function CompareTool({ vehicles, locale, initialModels = [] }) {
  const [selected, setSelected] = useState(initialModels.length ? initialModels : vehicles.slice(0, 2).map((vehicle) => vehicle.slug));
  const [viewMode, setViewMode] = useState('table');

  const chosenVehicles = useMemo(() => vehicles.filter((vehicle) => selected.includes(vehicle.slug)).slice(0, 3), [vehicles, selected]);

  const setVehicleAtIndex = (index, slug) => {
    setSelected((current) => {
      const next = [...current];
      next[index] = slug;
      return [...new Set(next)].slice(0, 3);
    });
  };

  return (
    <section className="container-shell py-16">
      <div className="premium-card mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Compare vehicles</p>
          <h1 className="text-4xl font-semibold">Compare up to 3 BYD models.</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">URL-ready compare state, responsive card/table modes, and architecture prepared for trims.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setViewMode('table')} className={`secondary-button ${viewMode === 'table' ? '!border-aurora !text-aurora' : ''}`}>Table</button>
          <button type="button" onClick={() => setViewMode('card')} className={`secondary-button ${viewMode === 'card' ? '!border-aurora !text-aurora' : ''}`}>Cards</button>
        </div>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <label key={index} className="premium-card text-sm font-medium">
            Vehicle {index + 1}
            <select value={selected[index] || ''} onChange={(event) => setVehicleAtIndex(index, event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/10">
              <option value="">Select model</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.slug} value={vehicle.slug}>{vehicle.name}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {viewMode === 'table' ? (
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100/80 dark:bg-white/5">
                <tr>
                  <th className="px-5 py-4 font-semibold">Spec</th>
                  {chosenVehicles.map((vehicle) => <th key={vehicle.slug} className="px-5 py-4 font-semibold">{vehicle.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {compareFields.map((field) => {
                  const values = chosenVehicles.map((vehicle) => vehicle.compare[field.key]);
                  const different = new Set(values).size > 1;
                  return (
                    <tr key={field.key} className="border-t border-slate-200/70 dark:border-white/10">
                      <td className="px-5 py-4 text-slate-500">{t(field.label, locale)}</td>
                      {values.map((value, index) => (
                        <td key={`${field.key}-${index}`} className={`px-5 py-4 ${different ? 'font-semibold text-aurora' : ''}`}>{value}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {chosenVehicles.map((vehicle) => (
            <div key={vehicle.slug} className="premium-card">
              <h3 className="text-2xl font-semibold">{vehicle.name}</h3>
              <div className="mt-6 space-y-3 text-sm">
                {compareFields.map((field) => (
                  <div key={field.key} className="flex items-start justify-between gap-4 border-b border-slate-200/70 pb-3 dark:border-white/10">
                    <span className="text-slate-500">{t(field.label, locale)}</span>
                    <span className="text-right font-semibold">{vehicle.compare[field.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
