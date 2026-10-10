import { Search, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function EpisodeSearch({ value, onChange }) {
  const { t } = useLanguage();
  return (
    <div className="search" role="search">
      <label className="search__label" htmlFor="episode-search">{t('episodes.searchLabel')}</label>
      <div className="search__field">
        <Search className="search__icon" size={20} strokeWidth={1.5} aria-hidden="true" />
        <input
          id="episode-search"
          className="search__input"
          type="search"
          inputMode="search"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('episodes.searchPlaceholder')}
        />
        {value && (
          <button type="button" className="search__reset" onClick={() => onChange('')} aria-label={t('episodes.reset')}>
            <X size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
