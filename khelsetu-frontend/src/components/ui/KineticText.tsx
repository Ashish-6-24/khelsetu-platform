import { clsx } from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface KineticTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export const KineticText = ({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
  stagger = 60,
}: KineticTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    // @ts-expect-error Tag is a valid HTML element
    <Tag ref={ref} className={twMerge(clsx('overflow-hidden', className))}>
      <span className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={clsx(
              'inline-block mr-[0.3em]',
              'transition-all duration-500',
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4',
            )}
            style={{
              transitionDelay: visible ? `${delay + i * stagger}ms` : '0ms',
            }}
          >
            {word}
          </span>
        ))}
      </span>
    </Tag>
  );
};
