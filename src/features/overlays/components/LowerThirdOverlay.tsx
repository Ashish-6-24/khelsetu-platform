import { motion } from 'framer-motion';

interface LowerThirdOverlayProps {
  title: string;
  subtitle: string;
  accent?: string;
}

export const LowerThirdOverlay = ({
  title,
  subtitle,
  accent = 'from-blue-600 to-indigo-600',
}: LowerThirdOverlayProps) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-[var(--bg-inverse)] p-4 rounded-r-xl"
    >
      <div
        className={`inline-block px-3 py-1.5 bg-gradient-to-r ${accent} rounded-t-lg`}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-white">
          {title}
        </p>
      </div>
      <div className="bg-[var(--bg-surface-raised)] px-4 py-2.5 rounded-b-xl border-l-2 border-white/20">
        <p className="text-sm font-semibold text-white">{subtitle}</p>
      </div>
    </motion.div>
  );
};
