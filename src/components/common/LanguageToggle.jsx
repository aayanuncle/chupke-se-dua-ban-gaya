import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="lang-toggle" role="group" aria-label={t('nav.language')}>
      <button type="button" className="lang-toggle__btn" aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">
        EN
      </button>
      <button type="button" className="lang-toggle__btn lang-toggle__btn--ur" aria-pressed={lang === 'ur'} onClick={() => setLang('ur')} lang="ur">
        اردو
      </button>
    </div>
  );
}
