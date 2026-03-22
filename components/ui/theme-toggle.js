'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    let currentTheme = document.documentElement.dataset.theme || 'light';

    try {
      const storedTheme = window.localStorage ? window.localStorage.getItem('theme') : null;
      if (storedTheme) {
        currentTheme = storedTheme;
      } else if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
      }
    } catch (error) {
      currentTheme = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.dataset.theme = currentTheme;
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');

    try {
      if (window.localStorage) {
        window.localStorage.setItem('theme', nextTheme);
      }
    } catch (error) {
      // Ignore storage write failures in privacy-restricted browsers.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-300/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 transition hover:border-aurora hover:text-aurora dark:border-white/10 dark:text-slate-200"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Theme'}
    </button>
  );
}
