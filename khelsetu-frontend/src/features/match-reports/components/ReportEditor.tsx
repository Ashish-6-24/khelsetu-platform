import { useState } from 'react';

import type { MatchReport as MatchReportData } from '../types';
import { MatchReport as MatchReportView } from './MatchReport';

interface ReportEditorProps {
  report: MatchReportData;
  teamAName: string;
  teamBName: string;
  onSave: (
    updates: Partial<Pick<MatchReportData, 'title' | 'summary' | 'highlights'>>,
  ) => void;
  onPublish: () => void;
  isSaving: boolean;
  isPublishing: boolean;
}

export function ReportEditor({
  report,
  teamAName,
  teamBName,
  onSave,
  onPublish,
  isSaving,
  isPublishing,
}: ReportEditorProps) {
  const [title, setTitle] = useState(report.title);
  const [summary, setSummary] = useState(report.summary);
  const [highlights, setHighlights] = useState(report.highlights);
  const [newHighlight, setNewHighlight] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ title, summary, highlights });
  };

  const editedReport: MatchReportData = {
    ...report,
    title,
    summary,
    highlights,
  };

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">
          Edit Report
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--bg-surface-sunken)] dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-raised)]"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--bg-surface-sunken)] disabled:opacity-50 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-secondary)] dark:hover:bg-[var(--bg-surface-raised)]"
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="rounded-lg bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-hover)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPublishing ? 'Publishing...' : 'Publish Report'}
          </button>
        </div>
      </div>

      {showPreview ? (
        <MatchReportView
          report={editedReport}
          teamAName={teamAName}
          teamBName={teamBName}
        />
      ) : (
        <div className="space-y-6">
          {/* Title Field */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-6 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
              Report Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2.5 text-[var(--text-primary)] shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-white"
            />
          </div>

          {/* Summary Field */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-6 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
              Match Summary
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2.5 text-[var(--text-primary)] shadow-sm transition-colors focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-white"
            />
          </div>

          {/* Highlights Editor */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-6 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
              Highlights
            </label>
            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 rounded-lg bg-[var(--bg-surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] dark:bg-[var(--bg-surface-raised)]/50 dark:text-[var(--text-secondary)]">
                    {highlight}
                  </span>
                  <button
                    onClick={() => handleRemoveHighlight(index)}
                    aria-label={`Remove highlight: ${highlight}`}
                    className="flex-shrink-0 rounded-lg p-2 text-[var(--text-tertiary)] transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddHighlight()}
                  placeholder="Add a new highlight..."
                  aria-label="New highlight text"
                  className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] shadow-sm focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20 dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface-raised)] dark:text-white"
                />
                <button
                  onClick={handleAddHighlight}
                  disabled={!newHighlight.trim()}
                  className="rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
