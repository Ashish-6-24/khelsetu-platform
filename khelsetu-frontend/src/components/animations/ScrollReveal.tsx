import { type Variants, motion, useInView } from 'framer-motion';

import { useRef } from 'react';

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

const buildVariants = (intensity: Intensity, stagger: boolean): Variants => {
  const { offset, scale, duration } = intensityConfig[intensity];
  return {
    hidden: {
      opacity: 0,
      y: offset,
      scale,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1], // gentle ease-out
        ...(stagger ? { staggerChildren: 0.08, delayChildren: 0 } : {}),
      },
    },
  };
};

/**
 * ScrollReveal — wraps children with a scroll-triggered entrance animation.
 *
 * Uses `whileInView` with `once: true` so the animation plays only the first
 * time the element enters the viewport. Intensity controls how dramatic the
 * entrance is:
 *
 * - **bold**: 40px slide-up + 0.97 scale — hero, metrics, CTA
 * - **moderate**: 24px slide-up + 0.99 scale — features, sports, testimonials
 * - **subtle**: 12px slide-up, no scale — pricing, FAQ, footer
 *
 * Respects `prefers-reduced-motion` via Framer Motion's built-in handling.
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

  const variants = buildVariants(intensity, stagger);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger ? variants : undefined}
      transition={
        !stagger
          ? {
              duration: intensityConfig[intensity].duration,
              ease: [0.16, 1, 0.3, 1],
              delay,
            }
          : {
              ...(variants.visible as { transition?: object }).transition,
              delay,
            }
      }
      {...(!stagger && {
        initial: {
          opacity: 0,
          y: intensityConfig[intensity].offset,
          scale: intensityConfig[intensity].scale,
        },
        animate: isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : {
              opacity: 0,
              y: intensityConfig[intensity].offset,
              scale: intensityConfig[intensity].scale,
            },
      })}
      className={className}
      {...(stagger && {
        variants,
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
      })}
    >
      {stagger ? children : children}
    </motion.div>
  );
};

/**
 * Simplified ScrollReveal that uses straightforward motion props.
 * More reliable than the variant-based approach above.
 */
export const Reveal = ({
  children,
  intensity = 'moderate',
  delay = 0,
  className,
}: Omit<ScrollRevealProps, 'stagger' | 'staggerDelay'>) => {
  const { offset, scale, duration } = intensityConfig[intensity];

  return (
    <motion.div
      initial={{ opacity: 0, y: offset, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
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
