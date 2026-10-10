import { siteConfig } from './siteConfig.js';

const makeFallbackEpisode = (number) => ({
  id: `episode-${String(number).padStart(3, '0')}`,
  number,
  title: '',
  language: 'ur',
  content: [{ type: 'paragraph', text: 'This episode is not available yet.' }],
});

const entries = Array.from({ length: 76 }, (_, index) => {
  const number = index + 1;
  const id = `episode-${String(number).padStart(3, '0')}`;

  return {
    id,
    number,
    title: '',
    keywords: ['sample', number === 2 ? 'urdu' : ''],
    load: async () => {
      try {
        return await import(`./episodes/${id}.js`);
      } catch {
        return { default: makeFallbackEpisode(number) };
      }
    },
  };
}).map((entry) => ({
  ...entry,
  keywords: entry.keywords.filter(Boolean),
}));

// Always sorted ascending, whatever order the entries are written in.
export const episodes = [...entries].sort((a, b) => a.number - b.number);

const byNumber = new Map(episodes.map((e) => [e.number, e]));

export const totalEpisodes = episodes.length;

export const getEpisode = (number) => byNumber.get(Number(number)) || null;

export const getLatestEpisode = () => episodes[episodes.length - 1] || null;

export const getFirstEpisode = () => episodes[0] || null;

// Previous / next follow the episodes that actually exist.
export function getNeighbours(number) {
  const i = episodes.findIndex((e) => e.number === Number(number));
  return {
    prev: i > 0 ? episodes[i - 1] : null,
    next: i >= 0 && i < episodes.length - 1 ? episodes[i + 1] : null,
  };
}

const cache = new Map();

// Loads (and caches) the full text of one episode.
export function loadEpisode(number) {
  const meta = getEpisode(number);
  if (!meta) return Promise.reject(new Error(`Episode ${number} not found`));
  if (!cache.has(meta.id)) {
    cache.set(
      meta.id,
      meta.load().then((m) => m.default).catch((err) => {
        cache.delete(meta.id);
        throw err;
      })
    );
  }
  return cache.get(meta.id);
}
