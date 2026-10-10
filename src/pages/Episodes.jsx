import { useMemo, useState } from 'react';
import { ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import Container from '../components/common/Container.jsx';
import Button from '../components/common/Button.jsx';
import WhatsAppButton from '../components/common/WhatsAppButton.jsx';
import EpisodeSearch from '../components/episodes/EpisodeSearch.jsx';
import EpisodeList from '../components/episodes/EpisodeList.jsx';
import EpisodeCard from '../components/episodes/EpisodeCard.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { episodes, getLatestEpisode, totalEpisodes } from '../data/episodeRegistry.js';
import { searchEpisodes } from '../utils/search.js';

export default function Episodes() {
  const { t, num, novelTitle } = useLanguage();
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('asc');
  const [view, setView] = useState('covers');
  useDocumentTitle(`${t('episodes.title')} · ${novelTitle}`);

  const results = useMemo(() => {
    const found = searchEpisodes(episodes, query);
    return order === 'asc' ? found : [...found].reverse();
  }, [query, order]);

  const latest = getLatestEpisode();
  const searching = query.trim() !== '';

  return (
    <section className="library">
      <Container>
        <header className="library__head">
          <h1 className="library__title">{t('episodes.title')}</h1>
          <p className="library__count">{t('episodes.total', { count: num(totalEpisodes) })}</p>
        </header>

        {latest && !searching && (
          <div className="library__latest">
            <p className="library__latest-label">{t('episodes.latest')}</p>
            <EpisodeCard episode={latest} variant="row" />
          </div>
        )}

        <div className="library__tools">
          <EpisodeSearch value={query} onChange={setQuery} />
          <div className="library__buttons">
            <Button variant="text" icon={ArrowUpDown} onClick={() => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}>
              {t(order === 'asc' ? 'episodes.sortAsc' : 'episodes.sortDesc')}
            </Button>
            <div className="viewtoggle" role="group" aria-label={t('episodes.viewCovers')}>
              <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} aria-label={t('episodes.viewList')} title={t('episodes.viewList')}>
                <List size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button type="button" aria-pressed={view === 'covers'} onClick={() => setView('covers')} aria-label={t('episodes.viewCovers')} title={t('episodes.viewCovers')}>
                <LayoutGrid size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {searching && <p className="library__found" role="status">{t('episodes.found', { count: num(results.length) })}</p>}

        {results.length > 0 ? (
          <EpisodeList episodes={results} view={view} />
        ) : (
          <div className="empty">
            <p className="empty__title">{t('episodes.empty', { q: query.trim() })}</p>
            <p>{t('episodes.emptyHelp')}</p>
            <Button variant="outline" onClick={() => setQuery('')}>{t('episodes.reset')}</Button>
          </div>
        )}

        <div className="library__buy">
          <WhatsAppButton kind="novel" variant="accent">{t('btn.buyNovel')}</WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
