import EpisodeCard from './EpisodeCard.jsx';

// view: 'list' | 'covers'
export default function EpisodeList({ episodes, view = 'list' }) {
  return (
    <ul className={view === 'covers' ? 'ep-grid' : 'ep-rows'}>
      {episodes.map((e) => (
        <li key={e.id}>
          <EpisodeCard episode={e} variant={view === 'covers' ? 'tile' : 'row'} coverSize="md" />
        </li>
      ))}
    </ul>
  );
}
