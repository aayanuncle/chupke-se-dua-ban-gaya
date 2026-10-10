import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import EpisodeCover from './EpisodeCover.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

// variant 'row' = editorial list row, 'tile' = cover tile, 'chip' = number only.
export default function EpisodeCard({ episode, variant = 'row', coverSize = 'md' }) {
  const { num, episodeLabel } = useLanguage();
  const to = `/episode/${episode.number}`;
  const label = episode.title ? `${episodeLabel(episode.number)}: ${episode.title}` : episodeLabel(episode.number);

  if (variant === 'chip') {
    return <Link to={to} className="ep-chip" aria-label={label}>{num(episode.number)}</Link>;
  }
  if (variant === 'tile') {
    return (
      <Link to={to} className="ep-tile" aria-label={label}>
        <EpisodeCover episode={episode} size={coverSize} />
      </Link>
    );
  }
  return (
    <Link to={to} className="ep-row" aria-label={label}>
      <span className="ep-row__num" aria-hidden="true">{num(episode.number)}</span>
      <span className="ep-row__body">
        <span className="ep-row__title">{episode.title || episodeLabel(episode.number)}</span>
        {episode.title && <span className="ep-row__label">{episodeLabel(episode.number)}</span>}
        {episode.excerpt && <span className="ep-row__excerpt">{episode.excerpt}</span>}
      </span>
      <ChevronRight className="ep-row__icon icon-flip" size={20} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}
