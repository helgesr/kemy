import { useState, useEffect } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('kemy-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('kemy-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}
