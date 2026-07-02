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
      className="bg-gradient-to-r from-gray-900/90 to-transparent p-4 rounded-r-xl backdrop-blur-sm"
    >
      <div
        className={`inline-block px-3 py-1 bg-gradient-to-r ${accent} rounded-t-lg`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider">
          {title}
        </p>
      </div>
      <div className="bg-gray-900/80 px-3 py-2 rounded-b-xl">
        <p className="text-sm font-medium">{subtitle}</p>
      </div>
    </motion.div>
  );
};
