import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import no, { type TranslationKey } from './no';
import en from './en';

export type Lang = 'no' | 'en';

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

const translations = { no, en } as const;

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'no';
    return (localStorage.getItem('kemy-lang') as Lang) || 'no';
  });

  useEffect(() => {
    localStorage.setItem('kemy-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function toggle() {
    setLang((l) => (l === 'no' ? 'en' : 'no'));
  }

  function t(key: TranslationKey): string {
    return translations[lang][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useT must be used within LanguageProvider');
  return ctx;
}
