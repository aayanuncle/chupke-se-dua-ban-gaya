import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useLanguage } from '../hooks/useLanguage.jsx';

export default function NotFound({ episodeNumber = null }) {
  const { t, num } = useLanguage();
  const title = episodeNumber ? t('notfound.episode', { n: num(episodeNumber) }) : t('notfound.title');
  useDocumentTitle(title);
  return (
    <section className="notfound">
      <Container narrow>
        <span className="rule" aria-hidden="true" />
        <h1 className="notfound__title">{title}</h1>
        <p>{t('notfound.body')}</p>
        <div className="notfound__actions">
          <Button to="/episodes" variant="primary">{t('reader.back')}</Button>
          <Button to="/" variant="text">{t('nav.home')}</Button>
        </div>
      </Container>
    </section>
  );
}
