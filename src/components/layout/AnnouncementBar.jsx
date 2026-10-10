import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function AnnouncementBar() {
  const { pick } = useLanguage();
  const { enabled, text, link } = siteConfig.announcement;
  if (!enabled) return null;
  const message = pick(text);
  return (
    <div className="announce">
      {link ? <Link to={link}>{message}</Link> : <span>{message}</span>}
    </div>
  );
}
