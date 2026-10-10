import { Minus, Plus, RotateCcw } from 'lucide-react';
import { SCALE_MAX, SCALE_MIN } from '../../hooks/useReadingPreferences.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function ReaderControls({ prefs, onLarger, onSmaller, onReset, onTheme, themes }) {
  const { t, num } = useLanguage();
  const themeLabel = { paper: t('reader.themePaper'), white: t('reader.themeWhite') };
  return (
    <div className="controls" role="group" aria-label={t('reader.controls')}>
      <div className="controls__group">
        <button type="button" className="controls__btn" onClick={onSmaller} disabled={prefs.scale <= SCALE_MIN} aria-label={t('reader.smaller')}>
          <Minus size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <span className="controls__value" aria-live="polite">{num(prefs.scale)}%</span>
        <button type="button" className="controls__btn" onClick={onLarger} disabled={prefs.scale >= SCALE_MAX} aria-label={t('reader.larger')}>
          <Plus size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <button type="button" className="controls__btn" onClick={onReset} aria-label={t('reader.reset')}>
          <RotateCcw size={16} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>
      <div className="controls__group" role="radiogroup" aria-label={t('reader.theme')}>
        {themes.map((th) => (
          <button
            key={th}
            type="button"
            role="radio"
            aria-checked={prefs.theme === th}
            aria-label={themeLabel[th]}
            title={themeLabel[th]}
            className={`controls__swatch controls__swatch--${th}`}
            onClick={() => onTheme(th)}
          />
        ))}
      </div>
    </div>
  );
}
