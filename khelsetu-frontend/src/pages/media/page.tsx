import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Download, Image, Trash2, Upload } from 'lucide-react';

import { useState } from 'react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'logo';
  url: string;
  size: string;
  uploadedAt: string;
}

const mockMedia: MediaItem[] = [
  {
    id: '1',
    name: 'NPL Banner',
    type: 'image',
    url: '/media/npl-banner.jpg',
    size: '2.4 MB',
    uploadedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Team Logo - Kings',
    type: 'logo',
    url: '/media/kings-logo.png',
    size: '156 KB',
    uploadedAt: '2024-01-14',
  },
  {
    id: '3',
    name: 'Match Highlights',
    type: 'video',
    url: '/media/highlights.mp4',
    size: '45 MB',
    uploadedAt: '2024-01-13',
  },
];

export const MediaPage = () => {
  const [media] = useState<MediaItem[]>(mockMedia);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = ['all', 'image', 'video', 'logo'];
  const filtered =
    activeFilter === 'all'
      ? media
      : media.filter((m) => m.type === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Media Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage images, videos, and logos
          </p>
        </div>
        <Button variant="primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
              activeFilter === f
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <Card key={item.id} hover>
            <CardBody>
              <div className="space-y-3">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  {item.type === 'image' && (
                    <Image className="w-8 h-8 text-gray-400" />
                  )}
                  {item.type === 'video' && (
                    <Image className="w-8 h-8 text-gray-400" />
                  )}
                  {item.type === 'logo' && (
                    <Image className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.size}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="capitalize">
                    {item.type}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
