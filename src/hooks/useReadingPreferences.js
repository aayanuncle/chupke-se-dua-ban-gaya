import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'novel.reader';
export const SCALE_MIN = 80;
export const SCALE_MAX = 160;
const SCALE_STEP = 10;
const THEMES = ['paper', 'white'];
const DEFAULTS = { scale: 100, theme: 'paper' };

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      scale: Number.isFinite(saved?.scale) ? Math.min(SCALE_MAX, Math.max(SCALE_MIN, saved.scale)) : DEFAULTS.scale,
      theme: THEMES.includes(saved?.theme) ? saved.theme : DEFAULTS.theme,
    };
  } catch {
    return DEFAULTS;
  }
}

export function useReadingPreferences() {
  const [prefs, setPrefs] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* storage unavailable */
    }
  }, [prefs]);

  const larger = useCallback(() => setPrefs((p) => ({ ...p, scale: Math.min(SCALE_MAX, p.scale + SCALE_STEP) })), []);
  const smaller = useCallback(() => setPrefs((p) => ({ ...p, scale: Math.max(SCALE_MIN, p.scale - SCALE_STEP) })), []);
  const resetScale = useCallback(() => setPrefs((p) => ({ ...p, scale: DEFAULTS.scale })), []);
  const setTheme = useCallback((theme) => THEMES.includes(theme) && setPrefs((p) => ({ ...p, theme })), []);

  return { prefs, larger, smaller, resetScale, setTheme, themes: THEMES };
}
