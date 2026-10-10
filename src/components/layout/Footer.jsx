import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import Container from '../common/Container.jsx';
import LanguageToggle from '../common/LanguageToggle.jsx';
import SocialLinks from '../common/SocialLinks.jsx';
import WhatsAppButton from '../common/WhatsAppButton.jsx';
import { NAV_LINKS } from './Navbar.jsx';
import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function Footer() {
  const { t, num, novelTitle, authorName } = useLanguage();
  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__title">{novelTitle}</p>
            <p className="footer__author">{authorName}</p>
            <p className="footer__tagline">{t('footer.tagline', { author: authorName })}</p>
          </div>

          <nav className="footer__col" aria-label={t('footer.pages')}>
            <h2 className="footer__heading">{t('footer.pages')}</h2>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.to}><Link to={l.to}>{t(l.key)}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">{t('footer.reach')}</h2>
            <div className="footer__reach">
              <WhatsAppButton kind="contact" variant="text">{t('contact.whatsapp')}</WhatsAppButton>
              {siteConfig.email && (
                <a className="footer__mail" href={`mailto:${siteConfig.email}`}>
                  <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                  {siteConfig.email}
                </a>
              )}
              <SocialLinks />
              <WhatsAppButton kind="novel" variant="outline">{t('btn.buyNovel')}</WhatsAppButton>
            </div>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">{t('footer.language')}</h2>
            <LanguageToggle />
          </div>
        </div>

        <div className="footer__base">
          <p>{t('footer.rights', { year: num(new Date().getFullYear()), author: authorName })}</p>
          <p className="footer__signoff"><i aria-hidden="true" />{t('footer.signoff')}</p>
        </div>
      </Container>
    </footer>
  );
}
