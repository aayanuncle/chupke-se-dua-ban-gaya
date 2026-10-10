import { toAsciiDigits } from './format.js';

const normalise = (s) => toAsciiDigits(s).normalize('NFKC').toLowerCase().trim();

// A bare number ("12", "#12", "episode 12", "باب ۱۲") is an EXACT episode match,
// so "12" never returns 112 or 120. Anything else searches titles and keywords.
export function searchEpisodes(list, query) {
  const q = normalise(query);
  if (!q) return list;

  const numeric = q.match(/^(?:episode|ep\.?|باب|#)?\s*(\d+)$/);
  if (numeric) {
    const n = Number(numeric[1]);
    return list.filter((e) => e.number === n);
  }

  const tokens = q.split(/\s+/);
  return list.filter((e) => {
    const haystack = normalise([e.title, ...(e.keywords || [])].join(' '));
    return tokens.every((t) => haystack.includes(t));
  });
}
