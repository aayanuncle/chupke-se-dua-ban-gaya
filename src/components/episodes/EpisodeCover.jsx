import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

// One cover artwork for every episode. The number and title are HTML overlaid on a
// small "plate", never baked into the image, so the same cover is reused.
// size: 'sm' | 'md' | 'lg'
export default function EpisodeCover({ episode, size = 'md' }) {
  const { t, num } = useLanguage();
  return (
    <div className={`cover cover--${size}`}>
      <img className="cover__img" src={siteConfig.coverImage} alt="" loading="lazy" decoding="async" width="600" height="900" />
      <div className="cover__plate">
        <span className="cover__word">{t('episode.word')}</span>
        <span className="cover__num">{num(episode.number)}</span>
        {episode.title && <span className="cover__title">{episode.title}</span>}
      </div>
    </div>
  );
}
