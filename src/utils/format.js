const URDU_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

export const toUrduDigits = (value) => String(value).replace(/\d/g, (d) => URDU_DIGITS[d]);

export const toAsciiDigits = (value) =>
  String(value)
    .replace(/[۰-۹]/g, (d) => String(URDU_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));

export function readingMinutes(blocks = [], contentLang = 'en') {
  const words = blocks
    .filter((b) => b.type === 'paragraph' || b.type === 'heading')
    .reduce((sum, b) => sum + b.text.trim().split(/\s+/).filter(Boolean).length, 0);
  const wordsPerMinute = contentLang === 'ur' ? 140 : 210;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(iso, lang) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'ur' ? 'ur-PK' : 'en-GB', { dateStyle: 'long' }).format(d);
}
