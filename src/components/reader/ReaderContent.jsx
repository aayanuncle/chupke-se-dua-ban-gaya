// Renders structured episode blocks. `lang` is the language the episode is WRITTEN in,
// independent of the interface language, so Urdu text stays RTL inside an English UI.
export default function ReaderContent({ blocks, lang }) {
  const isUrdu = lang === 'ur';
  return (
    <div className={`prose${isUrdu ? ' prose--ur' : ''}`} lang={lang} dir={isUrdu ? 'rtl' : 'ltr'}>
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        if (block.type === 'break') return <div key={key} className="prose__break" role="separator" aria-hidden="true"><i /></div>;
        if (block.type === 'heading') return <h2 key={key} className="prose__heading">{block.text}</h2>;
        return <p key={key}>{block.text}</p>;
      })}
    </div>
  );
}
