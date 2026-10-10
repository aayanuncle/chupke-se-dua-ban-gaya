import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Button from '../common/Button.jsx';
import LanguageToggle from '../common/LanguageToggle.jsx';
import MobileMenu from './MobileMenu.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getFirstEpisode } from '../../data/episodeRegistry.js';

export const NAV_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/episodes', key: 'nav.episodes' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Navbar() {
  const { t, novelTitle } = useLanguage();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const first = getFirstEpisode();
  const startTo = first ? `/episode/${first.number}` : '/episodes';

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="wordmark" aria-label={novelTitle}>
          <span className="wordmark__title">{novelTitle}</span>
          <i className="wordmark__rule" aria-hidden="true" />
        </Link>

        <nav className="navbar__links" aria-label={t('nav.primary')}>
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className="navlink">
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <LanguageToggle />
          <Button to={startTo} variant="accent" className="navbar__cta">{t('nav.startReading')}</Button>
          <button type="button" className="navbar__burger" onClick={() => setOpen(true)} aria-label={t('nav.openMenu')} aria-expanded={open}>
            <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && <MobileMenu links={NAV_LINKS} startTo={startTo} onClose={() => setOpen(false)} />}
    </header>
  );
}
