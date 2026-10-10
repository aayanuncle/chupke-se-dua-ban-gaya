import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

function renderEmphasis(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part
  );
}

export default function AuthorBio({ className }) {
  const { pick } = useLanguage();
  const paragraphs = pick(siteConfig.authorBio);

  return paragraphs.map((paragraph, index) => (
    <p className={className} key={index}>{renderEmphasis(paragraph)}</p>
  ));
}
