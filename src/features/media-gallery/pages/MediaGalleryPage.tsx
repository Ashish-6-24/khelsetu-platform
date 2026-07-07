import { MediaGallery } from '@features/media-gallery';

const mockTournaments = [
  { value: '1', label: 'NPL 2024' },
  { value: '2', label: 'NPL 2023' },
];

const mockTeams = [
  { value: '1', label: 'Kathmandu Kings' },
  { value: '2', label: 'Pokhara Rhinos' },
  { value: '3', label: 'Biratnagar Warriors' },
];

const mockPlayers = [
  { value: '1', label: 'Rohit Paudel' },
  { value: '2', label: 'Dipendra Singh Airee' },
  { value: '3', label: 'Sandeep Lamichhane' },
];

const mockSeasons = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
];

export function MediaGalleryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-canvas)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MediaGallery
          tournaments={mockTournaments}
          teams={mockTeams}
          players={mockPlayers}
          seasons={mockSeasons}
        />
      </div>
    </div>
  );
}
