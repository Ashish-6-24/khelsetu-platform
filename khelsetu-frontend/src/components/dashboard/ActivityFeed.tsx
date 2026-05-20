import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import { motion } from 'framer-motion';

interface ActivityFeedProps {
  activities: {
    id: string;
    title: string;
    time: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <Card>
      <CardBody>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3"
            >
              <Badge
                variant={activity.type}
                className="w-2 h-2 p-0 rounded-full"
              >
                <span className="sr-only">{activity.type}</span>
              </Badge>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
