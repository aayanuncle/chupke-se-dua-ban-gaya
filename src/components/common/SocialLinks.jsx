import { getSocialLinks } from '../../utils/social.js';

// Renders nothing when no social links are configured (no dead icons).
export default function SocialLinks({ className = '' }) {
  const links = getSocialLinks();
  if (!links.length) return null;
  return (
    <ul className={`social ${className}`.trim()}>
      {links.map(({ key, url, label, Icon }) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="social__link" aria-label={label}>
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
