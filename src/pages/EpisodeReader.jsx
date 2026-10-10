import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import ReaderHeader from '../components/reader/ReaderHeader.jsx';
import ReaderContent from '../components/reader/ReaderContent.jsx';
import ReaderControls from '../components/reader/ReaderControls.jsx';
import ReaderProgress from '../components/reader/ReaderProgress.jsx';
import EpisodeNavigation from '../components/reader/EpisodeNavigation.jsx';
import NotFound from './NotFound.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { useReadingPreferences } from '../hooks/useReadingPreferences.js';
import { getEpisode, getNeighbours, loadEpisode } from '../data/episodeRegistry.js';
import { readingMinutes } from '../utils/format.js';

function ReaderView({ meta }) {
  const { t, episodeLabel, novelTitle } = useLanguage();
  const { prefs, larger, smaller, resetScale, setTheme, themes } = useReadingPreferences();
  const articleRef = useRef(null);
  const [state, setState] = useState({ status: 'loading', data: null });
  const [attempt, setAttempt] = useState(0);
  const [view, setView] = useState('original');

  useDocumentTitle(`${episodeLabel(meta.number)}${meta.title ? `: ${meta.title}` : ''} · ${novelTitle}`);

  useEffect(() => {
    let live = true;
    setState({ status: 'loading', data: null });
    loadEpisode(meta.number)
      .then((data) => live && setState({ status: 'ready', data }))
      .catch(() => live && setState({ status: 'error', data: null }));
    return () => {
      live = false;
    };
  }, [meta.number, attempt]);

  const { data } = state;
  const showTranslation = view === 'translation' && data?.translation;
  const blocks = showTranslation ? data.translation.content : data?.content;
  const contentLang = showTranslation ? data.translation.language : data?.language || 'en';
  const minutes = useMemo(() => (blocks ? readingMinutes(blocks, contentLang) : null), [blocks, contentLang]);
  const { prev, next } = getNeighbours(meta.number);

  return (
    <div className={`reader reader--${prefs.theme}`} style={{ '--reader-scale': prefs.scale / 100 }}>
      <ReaderProgress targetRef={articleRef} />
      <ReaderHeader episode={meta} minutes={minutes} />

      <div className="reader__bar">
        <Container narrow className="reader__bar-inner">
          <ReaderControls prefs={prefs} onLarger={larger} onSmaller={smaller} onReset={resetScale} onTheme={setTheme} themes={themes} />
          {data?.translation && (
            <div className="viewtoggle viewtoggle--text" role="group">
              <button type="button" aria-pressed={view === 'original'} onClick={() => setView('original')}>{t('reader.original')}</button>
              <button type="button" aria-pressed={view === 'translation'} onClick={() => setView('translation')}>{t('reader.translation')}</button>
            </div>
          )}
        </Container>
      </div>

      <Container narrow>
        <article ref={articleRef} className="reader__article" aria-busy={state.status === 'loading'}>
          {data?.sample && <p className="reader__sample" role="note">{t('reader.sample')}</p>}
          {state.status === 'loading' && (
            <div className="skeleton" role="status" aria-label={t('reader.loading')}>
              <i /><i /><i /><i />
            </div>
          )}
          {state.status === 'error' && (
            <div className="empty">
              <p className="empty__title">{t('reader.loadError')}</p>
              <Button variant="outline" onClick={() => setAttempt((a) => a + 1)}>{t('reader.retry')}</Button>
            </div>
          )}
          {state.status === 'ready' && <ReaderContent blocks={blocks} lang={contentLang} />}
        </article>

        {state.status === 'ready' && <EpisodeNavigation prev={prev} next={next} episode={meta} />}
      </Container>
    </div>
  );
}

export default function EpisodeReader() {
  const { number } = useParams();
  const meta = /^\d+$/.test(number) ? getEpisode(number) : null;
  if (!meta) return <NotFound episodeNumber={/^\d+$/.test(number) ? number : null} />;
  return <ReaderView key={meta.id} meta={meta} />;
}
