import { Link } from 'react-router-dom';

// Renders a router Link (to), an external anchor (href) or a <button>.
// variant: 'primary' (charcoal) | 'accent' (gold) | 'outline' | 'text'
export default function Button({
  to,
  href,
  variant = 'primary',
  icon: Icon,
  iconFlip = false,
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon className={`btn__icon${iconFlip ? ' icon-flip' : ''}`} size={18} strokeWidth={1.6} aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}
