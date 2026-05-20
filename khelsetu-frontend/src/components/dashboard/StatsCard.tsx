import { Card, CardBody } from '@components/ui/Card';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon?: React.ReactNode;
  color?: string;
}

export const StatsCard = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
}: StatsCardProps) => {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    yellow: 'from-yellow-500 to-orange-600',
    red: 'from-red-500 to-rose-600',
    purple: 'from-purple-500 to-pink-600',
  };

  return (
    <motion.div whileHover={{ y: -2 }}>
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {value}
              </p>
              {change && (
                <p
                  className={`text-sm mt-1 ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}
                >
                  {change.isPositive ? '↑' : '↓'} {change.value}%
                </p>
              )}
            </div>
            {icon && (
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white`}
              >
                {icon}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
