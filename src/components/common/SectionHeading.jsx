// `mark` is a small section number shown beside a fine gold rule.
export default function SectionHeading({ mark, title, intro, as: Tag = 'h2', id }) {
  return (
    <header className="section-heading">
      {mark !== undefined && (
        <span className="section-heading__mark" aria-hidden="true">
          {mark}
          <i />
        </span>
      )}
      <Tag className="section-heading__title" id={id}>{title}</Tag>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
  );
}
