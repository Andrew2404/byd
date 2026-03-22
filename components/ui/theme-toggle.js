'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const current = document.documentElement.dataset.theme || 'dark';
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-300/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 transition hover:border-aurora hover:text-aurora dark:border-white/10 dark:text-slate-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
