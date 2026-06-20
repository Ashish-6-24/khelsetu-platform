import { Button } from '@components/ui/Button';
import { clsx } from 'clsx';
import { Download, Image, Printer, Share2, Trophy } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import type { BracketFormat } from '../types';
import {
  exportBracketAsImage,
  exportBracketAsPdf,
  printBracket,
  shareBracket,
} from '../utils/bracketExport';

const FORMAT_OPTIONS: { value: BracketFormat; label: string }[] = [
  { value: 'single-elimination', label: 'Single Elimination' },
  { value: 'double-elimination', label: 'Double Elimination' },
  { value: 'knockout', label: 'Knockout' },
  { value: 'round-robin', label: 'Round Robin' },
  { value: 'group-to-knockout', label: 'Group to Knockout' },
];

interface BracketControlsProps {
  format: BracketFormat;
  onFormatChange: (format: BracketFormat) => void;
  tournamentName: string;
  bracketElementId: string;
}

export const BracketControls = ({
  format,
  onFormatChange,
  tournamentName,
  bracketElementId,
}: BracketControlsProps) => {
  const handleExportPdf = () => exportBracketAsPdf(bracketElementId, tournamentName);
  const handleExportImage = () => exportBracketAsImage(bracketElementId, tournamentName);
  const handlePrint = () => printBracket(bracketElementId);
  const handleShare = () => shareBracket(tournamentName);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Format selector */}
      <div className="relative">
        <select
          value={format}
          onChange={(e) => onFormatChange(e.target.value as BracketFormat)}
          aria-label="Bracket format"
          className={twMerge(
            clsx(
              'appearance-none rounded-xl border px-4 py-2 pr-9 text-sm font-medium',
              'bg-white dark:bg-gray-800',
              'border-gray-200 dark:border-gray-700',
              'text-gray-900 dark:text-white',
              'shadow-[var(--shadow-sm)]',
              'focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]/30',
              'cursor-pointer',
            ),
          )}
        >
          {FORMAT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Trophy className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/60 p-1 shadow-[var(--shadow-sm)]">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExportPdf}
          leftIcon={<Download className="h-3.5 w-3.5" />}
        >
          PDF
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExportImage}
          leftIcon={<Image className="h-3.5 w-3.5" />}
        >
          Image
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrint}
          leftIcon={<Printer className="h-3.5 w-3.5" />}
        >
          Print
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          leftIcon={<Share2 className="h-3.5 w-3.5" />}
        >
          Share
        </Button>
      </div>
    </div>
  );
};
