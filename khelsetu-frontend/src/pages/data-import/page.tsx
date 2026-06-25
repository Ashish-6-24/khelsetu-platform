import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  Upload,
} from 'lucide-react';

import { useState } from 'react';

interface ImportJob {
  id: string;
  fileName: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  records: number;
  date: string;
}

const mockImports: ImportJob[] = [
  {
    id: '1',
    fileName: 'teams_2024.csv',
    type: 'Teams',
    status: 'completed',
    records: 24,
    date: '2024-01-15',
  },
  {
    id: '2',
    fileName: 'players_roster.csv',
    type: 'Players',
    status: 'completed',
    records: 156,
    date: '2024-01-14',
  },
  {
    id: '3',
    fileName: 'matches_schedule.csv',
    type: 'Matches',
    status: 'failed',
    records: 0,
    date: '2024-01-13',
  },
];

export const DataImportPage = () => {
  const [imports] = useState<ImportJob[]>(mockImports);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Data Import/Export
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Bulk import and export data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Import Data
            </h3>
          </CardHeader>
          <CardBody>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag and drop CSV file here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                or
              </p>
              <Button variant="primary">Browse Files</Button>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                Supported: CSV, JSON (max 10MB)
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Export Data
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {['Tournaments', 'Teams', 'Players', 'Matches', 'Standings'].map(
                (type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {type}
                    </span>
                    <Button
                      variant="gold"
                      size="sm"
                      className="group transition-all duration-200 hover:shadow-md hover:shadow-yellow-500/20 active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:translate-y-0.5" />
                      Export
                    </Button>
                  </div>
                ),
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Import History
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {imports.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  {job.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : job.status === 'failed' ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <FileText className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {job.fileName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {job.type} • {job.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize ${job.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : job.status === 'failed' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {job.status}
                  </span>
                  {job.records > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {job.records} records
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
