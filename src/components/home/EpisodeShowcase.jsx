import { ArrowRight } from 'lucide-react';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import Button from '../common/Button.jsx';
import EpisodeCard from '../episodes/EpisodeCard.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { episodes, totalEpisodes } from '../../data/episodeRegistry.js';

const CHIP_LIMIT = 36;

export default function EpisodeShowcase() {
  const { t, num } = useLanguage();
  const newestFirst = [...episodes].reverse();
  const covers = newestFirst.slice(0, 3);
  const rows = newestFirst.slice(3, 9);
  const chips = episodes.slice(0, CHIP_LIMIT);

  return (
    <section className="showcase" aria-labelledby="showcase-title">
      <Container>
        <SectionHeading mark={num(1)} id="showcase-title" title={t('showcase.heading')} intro={t('showcase.sub', { count: num(totalEpisodes) })} />

        <div className="showcase__grid">
          <ul className="showcase__covers" aria-label={t('showcase.recent')}>
            {covers.map((e) => (
              <li key={e.id}><EpisodeCard episode={e} variant="tile" coverSize="md" /></li>
            ))}
          </ul>
          {rows.length > 0 && (
            <ul className="ep-rows showcase__rows">
              {rows.map((e) => (
                <li key={e.id}><EpisodeCard episode={e} variant="row" /></li>
              ))}
            </ul>
          )}
        </div>

        <div className="showcase__jump">
          <h3 className="showcase__jump-title">{t('showcase.jump')}</h3>
          <ul className="chips">
            {chips.map((e) => (
              <li key={e.id}><EpisodeCard episode={e} variant="chip" /></li>
            ))}
            {totalEpisodes > CHIP_LIMIT && <li className="chips__more">{t('showcase.more', { n: num(totalEpisodes - CHIP_LIMIT) })}</li>}
          </ul>
        </div>

        <div className="showcase__foot">
          <Button to="/episodes" variant="outline" icon={ArrowRight} iconFlip>{t('showcase.viewAll')}</Button>
        </div>
      </Container>
    </section>
  );
}
