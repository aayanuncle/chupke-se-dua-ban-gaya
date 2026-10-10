// SAMPLE TEXT ONLY — used by the demo episodes so the reader can be previewed.
// This is not Samra Mustafa's writing. Delete this file once real episodes exist.
export const sampleEnglish = [
  'This is sample text, placed here only so the reading layout can be previewed. It is not part of the novel.',
  'Long episodes are shown as a single narrow column with generous spacing, so that the eye can travel along each line without effort. Use the controls above to change the text size and the page tone.',
  'Each paragraph in an episode file becomes one paragraph on the page. Section breaks appear as a small ornament, like the one below.',
  null,
  'After a break the text continues as before. When the real episode is added, this sample disappears completely.',
  'Replace the contents of the episode file with the actual text, one paragraph per entry, and the page will update by itself.',
].map((text) => (text === null ? { type: 'break' } : { type: 'paragraph', text }));

export const sampleUrdu = [
  'یہ صرف نمونے کا متن ہے تاکہ اردو پڑھنے کا صفحہ دیکھا جا سکے۔ یہ ناول کا حصہ نہیں ہے۔',
  'اصل باب شامل کرنے کے بعد یہ نمونہ مکمل طور پر ہٹا دیا جائے گا، اور ہر پیراگراف اپنی اصل شکل میں دکھایا جائے گا۔',
  null,
  'باب کی فائل میں اصل متن لکھیے، ہر پیراگراف کے لیے ایک الگ اندراج، اور صفحہ خود بخود تازہ ہو جائے گا۔',
].map((text) => (text === null ? { type: 'break' } : { type: 'paragraph', text }));
