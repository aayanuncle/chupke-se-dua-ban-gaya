import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import Button from '../common/Button.jsx';
import LanguageToggle from '../common/LanguageToggle.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function MobileMenu({ links, startTo, onClose }) {
  const { t } = useLanguage();
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t('nav.primary')}>
      <button ref={closeRef} type="button" className="mobile-menu__close" onClick={onClose} aria-label={t('nav.closeMenu')}>
        <X size={24} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <nav className="mobile-menu__nav" aria-label={t('nav.primary')}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className="mobile-menu__link" onClick={onClose}>
            {t(l.key)}
          </NavLink>
        ))}
      </nav>
      <div className="mobile-menu__foot">
        <LanguageToggle />
        <Button to={startTo} variant="accent" onClick={onClose}>{t('nav.startReading')}</Button>
      </div>
    </div>
  );
}
