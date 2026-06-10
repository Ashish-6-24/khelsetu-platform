import { clsx } from 'clsx';

import { useEffect, useRef, useState } from 'react';

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export const SkipLink = ({
  targetId = 'main-content',
  label = 'Skip to main content',
}: SkipLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = linkRef.current;

    const handleFocus = (): void => {
      setIsVisible(true);
    };

    const handleBlur = (): void => {
      setIsVisible(false);
    };

    const handleTabKey = (e: KeyboardEvent): void => {
      if (e.key === 'Tab') {
        setIsVisible(true);
      }
    };

    document.addEventListener('keydown', handleTabKey);
    currentRef?.addEventListener('focus', handleFocus);
    currentRef?.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      currentRef?.removeEventListener('focus', handleFocus);
      currentRef?.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    target?.focus();
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      ref={linkRef}
      href={targetId.startsWith('#') ? targetId : `#${targetId}`}
      onClick={handleClick}
      className={clsx(
        'fixed top-4 left-4 z-[9999] px-4 py-2 text-sm font-medium rounded-lg',
        'bg-blue-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'transition-all duration-200',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0',
      )}
    >
      {label}
    </a>
  );
};
