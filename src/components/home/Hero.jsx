import Container from '../common/Container.jsx';
import Button from '../common/Button.jsx';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getFirstEpisode } from '../../data/episodeRegistry.js';

export default function Hero() {
  const { t, novelTitle, authorName } = useLanguage();
  const first = getFirstEpisode();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero__grid">
        <div className="hero__text">
          <p className="hero__eyebrow reveal reveal--1"><i aria-hidden="true" />{t('hero.eyebrow')}</p>
          <h1 className="hero__title reveal reveal--2" id="hero-title">{t('hero.title')}</h1>
          <p className="hero__body reveal reveal--3">{t('hero.body')}</p>
          <div className="hero__actions reveal reveal--4">
            <Button to={first ? `/episode/${first.number}` : '/episodes'} variant="primary" icon={ArrowRight} iconFlip>{t('nav.startReading')}</Button>
            <Button to="/episodes" variant="outline">{t('hero.explore')}</Button>
          </div>
          <p className="hero__credit reveal reveal--5">{t('hero.credit', { author: authorName })}</p>
        </div>

        <figure className="hero__figure">
          <div className="book">
            <img className="book__img" src={siteConfig.coverImage} alt={t('hero.coverAlt', { title: novelTitle })} width="600" height="900" fetchpriority="high" />
            <span className="book__spine" aria-hidden="true" />
            <span className="book__pages" aria-hidden="true" />
          </div>
          <span className="hero__frame" aria-hidden="true" />
        </figure>
      </Container>
    </section>
  );
}
