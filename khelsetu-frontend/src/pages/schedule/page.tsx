import { Badge } from '@components/ui/Badge';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { Calendar, Clock } from 'lucide-react';

import { useState } from 'react';

interface MatchSchedule {
  id: string;
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
  status: 'scheduled' | 'live' | 'completed';
}

const mockSchedule: MatchSchedule[] = [
  {
    id: '1',
    home: 'Kathmandu Kings',
    away: 'Pokhara Warriors',
    date: '2024-02-01',
    time: '14:00',
    venue: 'Dasharath Stadium',
    status: 'scheduled',
  },
  {
    id: '2',
    home: 'Biratnagar Bulls',
    away: 'Dhangadhi Stars',
    date: '2024-02-01',
    time: '18:00',
    venue: 'Pokhara Stadium',
    status: 'scheduled',
  },
  {
    id: '3',
    home: 'Chitwan Rhinos',
    away: 'Lumbini Lions',
    date: '2024-02-02',
    time: '10:00',
    venue: 'Bharatpur Stadium',
    status: 'scheduled',
  },
];

export const SchedulePage = () => {
  const [schedule] = useState<MatchSchedule[]>(mockSchedule);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Schedule
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Match calendar and scheduling
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Upcoming Matches
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {schedule.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {match.home}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      vs
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {match.away}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {match.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {match.time}
                    </span>
                    <span>{match.venue}</span>
                  </div>
                </div>
                <Badge
                  variant={match.status === 'live' ? 'error' : 'default'}
                  className="capitalize"
                >
                  {match.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
