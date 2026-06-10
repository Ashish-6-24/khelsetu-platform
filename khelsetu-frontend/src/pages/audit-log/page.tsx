import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { Filter, Shield } from 'lucide-react';

import { useState } from 'react';

interface AuditEntry {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}

const mockAudit: AuditEntry[] = [
  {
    id: '1',
    user: 'admin@khelsetu.com',
    action: 'Created tournament',
    resource: 'NPL 2024',
    timestamp: '2024-01-15 09:00',
    severity: 'info',
  },
  {
    id: '2',
    user: 'org@khelsetu.com',
    action: 'Updated team roster',
    resource: 'Kathmandu Kings',
    timestamp: '2024-01-15 10:30',
    severity: 'info',
  },
  {
    id: '3',
    user: 'scorer@khelsetu.com',
    action: 'Failed to submit score',
    resource: 'Match #12',
    timestamp: '2024-01-15 11:00',
    severity: 'error',
  },
  {
    id: '4',
    user: 'system',
    action: 'Auto-backup completed',
    resource: 'Database',
    timestamp: '2024-01-15 12:00',
    severity: 'info',
  },
];

export const AuditLogPage = () => {
  const [logs] = useState<AuditEntry[]>(mockAudit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Audit Log
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track all user actions and system events
          </p>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Activity Log
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                    User
                  </th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                    Action
                  </th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                    Resource
                  </th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                    Time
                  </th>
                  <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2 px-3 text-gray-900 dark:text-white">
                      {log.user}
                    </td>
                    <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                      {log.action}
                    </td>
                    <td className="py-2 px-3 text-gray-700 dark:text-gray-300">
                      {log.resource}
                    </td>
                    <td className="py-2 px-3 text-gray-500 dark:text-gray-400 text-xs">
                      {log.timestamp}
                    </td>
                    <td className="py-2 px-3">
                      <Badge
                        variant={
                          log.severity === 'error'
                            ? 'error'
                            : log.severity === 'warning'
                              ? 'warning'
                              : 'default'
                        }
                      >
                        {log.severity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
