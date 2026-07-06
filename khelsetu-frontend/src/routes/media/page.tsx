import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { useToast } from '@shared/ui/toast-context';
import { Download, Image, Trash2, Upload } from 'lucide-react';

import { useRef, useState } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  const filters = ['all', 'image', 'video', 'logo'];
  const filtered =
    activeFilter === 'all'
      ? media
      : media.filter((m) => m.type === activeFilter);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addToast({
        type: 'success',
        message: `Uploading ${files.length} file(s)...`,
      });
      // TODO: Connect to actual upload API endpoint
    }
  };

  const handleDownload = (item: MediaItem) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.name;
    link.click();
    addToast({
      type: 'success',
      message: `Downloading ${item.name}...`,
    });
  };

  const handleDelete = (item: MediaItem) => {
    addToast({
      type: 'warning',
      message: `Delete ${item.name}? This action cannot be undone.`,
    });
    // TODO: Connect to actual delete API endpoint
  };

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
        <Button
          variant="create"
          size="lg"
          leftIcon={<Upload className="h-4 w-4" />}
          onClick={handleUpload}
          aria-label="Upload media files"
        >
          Upload Media
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
              activeFilter === f
                ? 'bg-[var(--brand-primary)] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(item)}
                      aria-label={`Download ${item.name}`}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 dark:text-red-400"
                      onClick={() => handleDelete(item)}
                      aria-label={`Delete ${item.name}`}
                    >
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
