import { useLocation } from 'react-router-dom';

// Re-mounts on route change so the soft entrance plays once per page.
export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  return <div key={pathname} className="page-enter">{children}</div>;
}
