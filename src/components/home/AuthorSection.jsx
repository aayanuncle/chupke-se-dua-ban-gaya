import { Link } from 'react-router-dom';
import Container from '../common/Container.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import AuthorBio from '../common/AuthorBio.jsx';
import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function AuthorSection() {
  const { t, num, authorName } = useLanguage();
  return (
    <section className="author" aria-labelledby="author-title">
      <Container className="author__grid">
        <figure className="author__photo">
          <img src={siteConfig.authorImage} alt={t('author.photoAlt', { author: authorName })} loading="lazy" decoding="async" width="480" height="600" />
        </figure>
        <div className="author__text">
          <SectionHeading mark={num(2)} id="author-title" title={t('author.heading')} />
          <p className="author__name">{authorName}</p>
          <AuthorBio className="author__bio" />
          <Link to="/about" className="textlink">{t('author.link')}</Link>
        </div>
      </Container>
    </section>
  );
}
