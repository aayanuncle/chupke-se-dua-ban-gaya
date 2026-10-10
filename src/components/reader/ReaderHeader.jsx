import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import Container from '../common/Container.jsx';
import WhatsAppButton from '../common/WhatsAppButton.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { formatDate } from '../../utils/format.js';

export default function ReaderHeader({ episode, minutes }) {
  const { t, num, lang, episodeLabel, novelTitle } = useLanguage();
  return (
    <header className="reader-head">
      <Container narrow>
        <nav aria-label={t('reader.breadcrumb')}>
          <ol className="crumbs">
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><ChevronRight className="icon-flip" size={14} aria-hidden="true" /><Link to="/episodes">{t('nav.episodes')}</Link></li>
            <li><ChevronRight className="icon-flip" size={14} aria-hidden="true" /><span aria-current="page">{episodeLabel(episode.number)}</span></li>
          </ol>
        </nav>

        <h1 className="reader-head__num">{episode.title || episodeLabel(episode.number)}</h1>
        {episode.title && <p className="reader-head__label">{episodeLabel(episode.number)}</p>}

        <p className="reader-head__meta">
          {episode.date && <span>{t('reader.published', { date: formatDate(episode.date, lang) })}</span>}
          {minutes && (
            <span className="reader-head__time">
              <Clock size={15} strokeWidth={1.5} aria-hidden="true" />
              {t('reader.minRead', { n: num(minutes) })}
            </span>
          )}
        </p>
      </Container>
    </header>
  );
}
