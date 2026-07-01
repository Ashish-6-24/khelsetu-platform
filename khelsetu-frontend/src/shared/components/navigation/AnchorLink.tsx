import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Smart anchor link that handles cross-route navigation.
 * On same route: smooth scroll. On different route: full navigation
 * so browser's native hash scrolling works after page load.
 */
export const AnchorLink = ({ href, children, className, onClick }: AnchorLinkProps) => {
  const location = useLocation();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.();

      if (location.pathname === '/') {
        // Same route — smooth scroll
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Different route — hard navigate so browser scrolls after load
        window.location.href = href;
      }
    },
    [href, location.pathname, onClick],
  );

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
