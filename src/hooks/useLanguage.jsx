import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations.js';
import { siteConfig } from '../data/siteConfig.js';
import { toUrduDigits } from '../utils/format.js';

const STORAGE_KEY = 'novel.language';
const LanguageContext = createContext(null);

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'ur' || stored === 'en' ? stored : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLanguage);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice simply won't persist */
    }
  }, []);

  // Keep <html lang dir> in step with the interface language.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang];
    const num = (n) => (lang === 'ur' ? toUrduDigits(n) : String(n));
    const t = (key, vars = {}) => {
      const template = dict[key] ?? translations.en[key] ?? key;
      return template.replace(/\{(\w+)\}/g, (match, name) => (vars[name] !== undefined ? vars[name] : match));
    };
    const pick = (obj) => (obj ? obj[lang] || obj.en || '' : '');
    return {
      lang,
      dir: lang === 'ur' ? 'rtl' : 'ltr',
      setLang,
      t,
      num,
      pick,
      episodeLabel: (n) => t('episode.label', { n: num(n) }),
      novelTitle: pick(siteConfig.novelTitle),
      authorName: pick(siteConfig.authorName),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
