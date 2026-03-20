'use client';

import { useEffect, useState } from 'react';

export function AdminDashboard({ snapshot }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoggedIn(localStorage.getItem('admin-auth') === 'true');
  }, []);

  const login = async () => {
    const response = await fetch('/api/admin/login', { method: 'POST' });
    const result = await response.json();
    localStorage.setItem('admin-auth', 'true');
    setLoggedIn(true);
    setMessage(result.message);
  };

  if (!loggedIn) {
    return (
      <section className="container-shell py-20">
        <div className="premium-card mx-auto max-w-xl text-center">
          <p className="section-kicker">Mocked auth</p>
          <h1 className="text-4xl font-semibold">Admin / Content Manager</h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Single-user mocked authentication keeps the architecture ready for future replacement with real RBAC or CMS auth.</p>
          <button type="button" onClick={login} className="cta-button mt-8">Enter admin</button>
          {message ? <p className="mt-4 text-sm text-emerald-500">{message}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker">Internal manager</p>
          <h1 className="text-4xl font-semibold">Content, models, hero copy, and leads.</h1>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="premium-card lg:col-span-1">
          <nav className="space-y-3 text-sm">
            {['Homepage banners', 'Vehicles', 'Specs & pricing', 'Blog posts', 'Lead submissions'].map((label) => (
              <div key={label} className="rounded-2xl border border-slate-200/70 px-4 py-3 dark:border-white/10">{label}</div>
            ))}
          </nav>
        </div>
        <div className="space-y-6 lg:col-span-3">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="premium-card"><p className="text-sm text-slate-500">Vehicles</p><p className="mt-3 text-3xl font-semibold">{snapshot.vehicles.length}</p></div>
            <div className="premium-card"><p className="text-sm text-slate-500">Blog posts</p><p className="mt-3 text-3xl font-semibold">{snapshot.blogPosts.length}</p></div>
            <div className="premium-card"><p className="text-sm text-slate-500">Lead submissions</p><p className="mt-3 text-3xl font-semibold">{snapshot.leads.length}</p></div>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="premium-card">
              <h3 className="text-2xl font-semibold">Hero content</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{snapshot.homepageContent.hero.description.ka}</p>
            </div>
            <div className="premium-card">
              <h3 className="text-2xl font-semibold">Latest leads</h3>
              <div className="mt-4 space-y-3 text-sm">
                {snapshot.leads.length ? snapshot.leads.map((lead) => <div key={lead.id} className="rounded-2xl border border-slate-200/70 px-4 py-3 dark:border-white/10">{lead.name} — {lead.type}</div>) : <p className="text-slate-500">No local backup leads yet.</p>}
              </div>
            </div>
          </div>
          <div className="premium-card">
            <h3 className="text-2xl font-semibold">Vehicle records</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead><tr className="border-b border-slate-200/70 dark:border-white/10"><th className="px-3 py-3">Model</th><th className="px-3 py-3">Price</th><th className="px-3 py-3">Range</th><th className="px-3 py-3">Status</th></tr></thead>
                <tbody>
                  {snapshot.vehicles.map((vehicle) => (
                    <tr key={vehicle.slug} className="border-b border-slate-200/70 dark:border-white/10">
                      <td className="px-3 py-3">{vehicle.name}</td>
                      <td className="px-3 py-3">{vehicle.price}</td>
                      <td className="px-3 py-3">{vehicle.range} km*</td>
                      <td className="px-3 py-3 text-aurora">Mock editable</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
