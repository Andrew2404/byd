'use client';

import { useState } from 'react';

const initialState = {
  name: '',
  phone: '',
  email: '',
  city: '',
  interestedModel: '',
  message: '',
  consent: false,
};

export function LeadForm({ type = 'contact', vehicles = [], title, description }) {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value, type: inputType, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: inputType === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Submission failed');

      setStatus({ state: 'success', message: result.message });
      setFormData(initialState);
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  };

  return (
    <div className="premium-card">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="text-sm font-medium md:col-span-1">
          Name
          <input name="name" value={formData.name} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-aurora dark:border-white/10" required />
        </label>
        <label className="text-sm font-medium md:col-span-1">
          Phone
          <input name="phone" value={formData.phone} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-aurora dark:border-white/10" required />
        </label>
        <label className="text-sm font-medium md:col-span-1">
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-aurora dark:border-white/10" required />
        </label>
        <label className="text-sm font-medium md:col-span-1">
          City
          <input name="city" value={formData.city} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-aurora dark:border-white/10" />
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Interested model
          <select name="interestedModel" value={formData.interestedModel} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-aurora dark:border-white/10">
            <option value="">Select a model</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.slug} value={vehicle.name}>{vehicle.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium md:col-span-2">
          Message
          <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="mt-2 w-full rounded-2xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-aurora dark:border-white/10" />
        </label>
        <label className="flex items-start gap-3 text-sm text-slate-600 md:col-span-2 dark:text-slate-300">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-aurora focus:ring-aurora" />
          <span>I consent to GT Group and BYD Georgia contacting me regarding my request.</span>
        </label>
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status.state === 'loading'} className="cta-button">
            {status.state === 'loading' ? 'Sending…' : 'Submit'}
          </button>
          {status.message ? (
            <p className={status.state === 'success' ? 'text-sm text-emerald-500' : 'text-sm text-red-500'}>{status.message}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
