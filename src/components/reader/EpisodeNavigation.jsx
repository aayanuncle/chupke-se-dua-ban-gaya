import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../common/Button.jsx';
import WhatsAppButton from '../common/WhatsAppButton.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

function Step({ episode, direction }) {
  const { t, episodeLabel } = useLanguage();
  if (!episode) return <span className={`step step--${direction} step--empty`} aria-hidden="true" />;
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <Link to={`/episode/${episode.number}`} className={`step step--${direction}`} rel={direction}>
      <Icon className="icon-flip" size={20} strokeWidth={1.5} aria-hidden="true" />
      <span className="step__text">
        <span className="step__dir">{t(direction === 'prev' ? 'reader.prev' : 'reader.next')}</span>
        <span className="step__name">{episode.title || episodeLabel(episode.number)}</span>
        {episode.title && <span className="step__label">{episodeLabel(episode.number)}</span>}
      </span>
    </Link>
  );
}

export default function EpisodeNavigation({ prev, next, episode }) {
  const { t, episodeLabel } = useLanguage();
  return (
    <nav className="episode-nav" aria-label={episodeLabel(episode.number)}>
      <p className="episode-nav__end"><i aria-hidden="true" />{t('reader.end', { label: episodeLabel(episode.number) })}</p>
      <div className="episode-nav__steps">
        <Step episode={prev} direction="prev" />
        <Step episode={next} direction="next" />
      </div>
      <div className="episode-nav__foot">
        <Button to="/episodes" variant="text">{t('reader.back')}</Button>
        <WhatsAppButton kind="episode" episode={episode} variant="outline">{t('btn.buyPdf')}</WhatsAppButton>
      </div>
    </nav>
  );
}
