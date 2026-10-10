export default function Container({ as: Tag = 'div', narrow = false, className = '', children, ...rest }) {
  return (
    <Tag className={`container${narrow ? ' container--narrow' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
