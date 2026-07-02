import { type Variants, motion, useInView } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';

type Intensity = 'bold' | 'moderate' | 'subtle';

interface ScrollRevealProps {
  children: React.ReactNode;
  intensity?: Intensity;
  delay?: number;
  className?: string;
  /** Stagger children if true — each direct child gets an incremental delay */
  stagger?: boolean;
  staggerDelay?: number;
}

const intensityConfig: Record<
  Intensity,
  { offset: number; scale: number; duration: number }
> = {
  bold: { offset: 40, scale: 0.97, duration: 0.7 },
  moderate: { offset: 24, scale: 0.99, duration: 0.55 },
  subtle: { offset: 12, scale: 1, duration: 0.45 },
};

/**
 * ScrollReveal — wraps children with a scroll-triggered entrance animation.
 *
 * Uses CSS scroll-driven animations as progressive enhancement with
 * framer-motion fallback for Safari/older browsers.
 *
 * Safety: if IntersectionObserver doesn't fire within 3s (headless, slow JS,
 * network issues), content becomes visible anyway — content must never be
 * permanently invisible.
 *
 * Respects `prefers-reduced-motion`.
 */
export const ScrollReveal = ({
  children,
  intensity = 'moderate',
  delay = 0,
  className,
  stagger = false,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setFallbackVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const cssClass =
    intensity === 'bold'
      ? 'scroll-reveal-bold'
      : intensity === 'subtle'
        ? 'scroll-reveal-subtle'
        : 'scroll-reveal';

  const shouldShow = isInView || fallbackVisible;

  // For stagger mode, use framer-motion variants
  if (stagger) {
    const variants: Variants = {
      hidden: {
        opacity: 0,
        y: intensityConfig[intensity].offset,
        scale: intensityConfig[intensity].scale,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: intensityConfig[intensity].duration,
          ease: [0.16, 1, 0.3, 1],
          staggerChildren: 0.08,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={shouldShow ? 'visible' : 'hidden'}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Non-stagger: use CSS scroll-driven animations with framer-motion fallback
  return (
    <div ref={ref} className={`${cssClass} ${className ?? ''}`}>
      <motion.div
        initial={{
          opacity: 0,
          y: intensityConfig[intensity].offset,
          scale: intensityConfig[intensity].scale,
        }}
        animate={
          shouldShow
            ? { opacity: 1, y: 0, scale: 1 }
            : undefined
        }
        whileInView={fallbackVisible ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: intensityConfig[intensity].duration,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Simplified ScrollReveal that uses straightforward motion props.
 * Includes fallback: if IntersectionObserver doesn't fire in 3s, content shows.
 */
export const Reveal = ({
  children,
  intensity = 'moderate',
  delay = 0,
  className,
}: Omit<ScrollRevealProps, 'stagger' | 'staggerDelay'>) => {
  const { offset, scale, duration } = intensityConfig[intensity];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) setFallbackVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const cssClass =
    intensity === 'bold'
      ? 'scroll-reveal-bold'
      : intensity === 'subtle'
        ? 'scroll-reveal-subtle'
        : 'scroll-reveal';

  const shouldShow = isInView || fallbackVisible;

  return (
    <div ref={ref} className={`${cssClass} ${className ?? ''}`}>
      <motion.div
        initial={{ opacity: 0, y: offset, scale }}
        animate={shouldShow ? { opacity: 1, y: 0, scale: 1 } : undefined}
        whileInView={fallbackVisible ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * StaggerReveal — container that staggers its children's entrance.
 */
export const StaggerReveal = ({
  children,
  intensity = 'moderate',
  delay = 0,
  staggerDelay = 0.08,
  className,
}: Omit<ScrollRevealProps, 'stagger'>) => {
  const { offset, scale, duration } = intensityConfig[intensity];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: offset * 0.7, scale },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};
