'use client';

import { useMemo, useState } from 'react';
import { CarStage } from '@/components/three/car-stage';
import { formatCurrency } from '@/lib/utils';

const DESKTOP_CONTROL_HINTS = [
  {
    label: 'Rotate',
    description: 'Left click + drag',
    highlight: 'left',
  },
  {
    label: 'Drag',
    description: 'Right click + drag',
    highlight: 'right',
  },
  {
    label: 'Zoom',
    description: 'Scroll wheel',
    highlight: 'wheel',
  },
];

function MouseHintIcon({ highlight }) {
  const accentClass = 'fill-aurora/80';
  const mutedClass = 'fill-slate-500/20 dark:fill-white/15';

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <path d="M7 8.5a5 5 0 1 1 10 0v7a5 5 0 1 1-10 0v-7Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8.5v5.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <rect x="8.1" y="6.2" width="3.2" height="3.6" rx="0.8" className={highlight === 'left' ? accentClass : mutedClass} />
      <rect x="12.7" y="6.2" width="3.2" height="3.6" rx="0.8" className={highlight === 'right' ? accentClass : mutedClass} />
      <rect x="11.2" y="8.8" width="1.6" height="2.6" rx="0.8" className={highlight === 'wheel' ? accentClass : mutedClass} />
    </svg>
  );
}

export function ConfiguratorPanel({ vehicle, locale }) {
  const [selectedTrim, setSelectedTrim] = useState(vehicle.trims[0]);
  const [selectedColor, setSelectedColor] = useState(vehicle.colors[0]);
  const [selectedWheel, setSelectedWheel] = useState(vehicle.wheels[0]);
  const [selectedInterior, setSelectedInterior] = useState(vehicle.interiors[0]);
  const [viewMode, setViewMode] = useState('exterior');

  const computedPrice = useMemo(
    () => selectedTrim.price + selectedColor.priceImpact + selectedWheel.priceImpact + selectedInterior.priceImpact,
    [selectedTrim, selectedColor, selectedWheel, selectedInterior],
  );

  return (
    <section className="container-shell py-20">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Show 3D</p>
          <h2 className="section-title">Porsche-inspired configurator entry, tailored for BYD Georgia.</h2>
          <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-300">Built for graceful fallback, mobile usability, and future official BYD glTF assets with trim-aware pricing logic.</p>
        </div>
        <div className="premium-card min-w-[280px] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Configured estimate</p>
          <p className="mt-3 text-3xl font-semibold">{formatCurrency(computedPrice, locale === 'ka' ? 'ka-GE' : 'en-US')}</p>
          <p className="mt-2 text-sm text-slate-500">{vehicle.financeDisclaimer[locale]}</p>
        </div>
      </div>
      <div className="mb-8 grid gap-4 xl:grid-cols-4">
        <div className="premium-card flex flex-col xl:col-span-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Trim</p>
          <div className="space-y-3">
            {vehicle.trims.map((trim) => (
              <button key={trim.key} type="button" onClick={() => setSelectedTrim(trim)} className={`w-full rounded-2xl border px-4 py-3 text-left transition ${selectedTrim.key === trim.key ? 'border-aurora bg-aurora/10' : 'border-slate-200 dark:border-white/10'}`}>
                <span className="block font-semibold">{trim.name}</span>
                <span className="text-sm text-slate-500">{trim.range} km* · {trim.horsepower} hp*</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => setViewMode('exterior')} className={`secondary-button ${viewMode === 'exterior' ? '!border-aurora !text-aurora' : ''}`}>Exterior</button>
            <button type="button" onClick={() => setViewMode('interior')} className={`secondary-button ${viewMode === 'interior' ? '!border-aurora !text-aurora' : ''}`}>Interior</button>
          </div>
          <div className="mt-auto hidden space-y-3 border-t border-slate-200/80 pt-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-300 xl:block">
            {DESKTOP_CONTROL_HINTS.map((hint) => (
              <div key={hint.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/80 text-slate-500 dark:border-white/20 dark:text-slate-200">
                  <MouseHintIcon highlight={hint.highlight} />
                </span>
                <p className="leading-tight">
                  <span className="block text-slate-700 dark:text-slate-100">{hint.label}</span>
                  <span>{hint.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="xl:col-span-3">
          <CarStage
            vehicle={vehicle}
            viewMode={viewMode}
            exteriorColor={selectedColor.hex}
            interiorColorKey={selectedInterior.key}
            wheelKey={selectedWheel.key}
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="premium-card">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Exterior colors</p>
          <div className="flex flex-wrap gap-3">
            {vehicle.colors.map((color) => (
              <button key={color.key} type="button" onClick={() => setSelectedColor(color)} className={`flex items-center gap-3 rounded-full border px-3 py-2 ${selectedColor.key === color.key ? 'border-aurora' : 'border-slate-200 dark:border-white/10'}`}>
                <span className="h-5 w-5 rounded-full border border-black/10" style={{ background: color.hex }} />
                <span className="text-sm">{color.name[locale]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="premium-card">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Wheels</p>
          <div className="space-y-3">
            {vehicle.wheels.map((wheel) => (
              <button key={wheel.key} type="button" onClick={() => setSelectedWheel(wheel)} className={`w-full rounded-2xl border px-4 py-3 text-left ${selectedWheel.key === wheel.key ? 'border-aurora bg-aurora/10' : 'border-slate-200 dark:border-white/10'}`}>
                <span className="font-semibold">{wheel.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="premium-card">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Interior</p>
          <div className="space-y-3">
            {vehicle.interiors.map((interior) => (
              <button key={interior.key} type="button" onClick={() => setSelectedInterior(interior)} className={`w-full rounded-2xl border px-4 py-3 text-left ${selectedInterior.key === interior.key ? 'border-aurora bg-aurora/10' : 'border-slate-200 dark:border-white/10'}`}>
                <span className="font-semibold">{interior.name[locale]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
