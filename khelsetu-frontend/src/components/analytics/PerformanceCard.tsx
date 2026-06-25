import { Card, CardBody } from '@components/ui/Card';
import { motion } from 'framer-motion';

interface PerformanceCardProps {
  title: string;
  metrics: { label: string; value: string | number; trend?: 'up' | 'down' }[];
}

export const PerformanceCard = ({ title, metrics }: PerformanceCardProps) => {
  return (
    <Card>
      <CardBody>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {metric.value}
              </p>
              {metric.trend && (
                <span
                  className={
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }
                >
                  {metric.trend === 'up' ? '↑' : '↓'}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
