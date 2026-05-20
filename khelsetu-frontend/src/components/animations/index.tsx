import { motion } from 'framer-motion';

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.3,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const SlideDown = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const SlideLeft = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const SlideRight = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay, type: 'spring' }}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({
  children,
  staggerDelay = 0.05,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: staggerDelay } },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      },
    }}
  >
    {children}
  </motion.div>
);

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const AnimatedCounter = ({
  value,
}: {
  value: number;
  duration?: number;
}) => {
  return <motion.span>{value}</motion.span>;
};

export const FloatingElement = ({
  children,
  yOffset = 10,
  duration = 3,
}: {
  children: React.ReactNode;
  yOffset?: number;
  duration?: number;
}) => (
  <motion.div
    animate={{ y: [-yOffset, yOffset, -yOffset] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

export const LivePulse = ({
  size = 'md',
  color = 'blue',
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}) => {
  const sizeMap = { sm: 'w-2 h-2', md: 'w-3 h-3', lg: 'w-4 h-4' };
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorMap[color] || colorMap.blue}`}
      />
      <span
        className={`relative inline-flex rounded-full ${sizeMap[size]} ${colorMap[color] || colorMap.blue}`}
      />
    </span>
  );
};

export const SlideReveal = ({
  children,
  direction = 'up',
}: {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      {children}
    </motion.div>
  );
};
