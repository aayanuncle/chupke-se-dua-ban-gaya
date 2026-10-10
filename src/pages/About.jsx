import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import AuthorBio from '../components/common/AuthorBio.jsx';
import { siteConfig } from '../data/siteConfig.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { getFirstEpisode } from '../data/episodeRegistry.js';

export default function About() {
  const { t, pick, authorName } = useLanguage();
  const first = getFirstEpisode();
  useDocumentTitle(`${t('about.title')} · ${authorName}`);
  return (
    <section className="about">
      <Container className="about__grid">
        <figure className="about__photo">
          <img src={siteConfig.authorImage} alt={t('author.photoAlt', { author: authorName })} width="480" height="600" />
        </figure>
        <div className="about__text">
          <h1 className="about__title">{t('about.title')}</h1>
          <p className="about__name">{authorName}</p>
          <AuthorBio className="about__bio" />
          <div className="about__actions">
            <Button to={first ? `/episode/${first.number}` : '/episodes'} variant="primary">{t('nav.startReading')}</Button>
            <Button to="/contact" variant="outline">{t('nav.contact')}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
