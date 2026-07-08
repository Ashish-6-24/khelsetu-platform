import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
            Audit Log
          </h1>
          <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
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
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              Activity Log
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                  <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    User
                  </th>
                  <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Action
                  </th>
                  <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Resource
                  </th>
                  <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Time
                  </th>
                  <th className="text-left py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]"
                  >
                    <td className="py-2 px-3 text-[var(--text-primary)] dark:text-white">
                      {log.user}
                    </td>
                    <td className="py-2 px-3 text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                      {log.action}
                    </td>
                    <td className="py-2 px-3 text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                      {log.resource}
                    </td>
                    <td className="py-2 px-3 text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] text-xs">
                      {log.timestamp}
                    </td>
                    <td className="py-2 px-3">
                      <Badge
                        variant={
                          log.severity === 'error' || log.severity === 'warning'
                            ? log.severity
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
