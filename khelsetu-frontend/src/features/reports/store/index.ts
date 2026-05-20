import type { ExportJob, ReportData, ReportType } from '@features/reports/types';
import { create } from 'zustand';

interface ReportsState {
  reports: ReportData[];
  exportJobs: ExportJob[];
  isLoading: boolean;
  setReports: (reports: ReportData[]) => void;
  addExportJob: (job: ExportJob) => void;
  updateExportJob: (id: string, status: ExportJob['status'], url?: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useReportsStore = create<ReportsState>((set) => ({
  reports: [],
  exportJobs: [],
  isLoading: false,
  setReports: (reports) => set({ reports }),
  addExportJob: (job) => set((state) => ({ exportJobs: [...state.exportJobs, job] })),
  updateExportJob: (id, status, url) =>
    set((state) => ({
      exportJobs: state.exportJobs.map((j) => (j.id === id ? { ...j, status, url } : j)),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));

const mockReports: Record<ReportType, ReportData> = {
  tournament: {
    id: 'r1',
    name: 'Tournament Overview',
    type: 'tournament',
    generatedAt: new Date().toISOString(),
    data: [
      { name: 'NPL 2024', teams: 12, matches: 48, status: 'completed' },
      { name: 'Kathmandu Cup', teams: 8, matches: 24, status: 'live' },
    ],
    summary: { total: 2, completed: 1, live: 1 },
  },
  team: {
    id: 'r2',
    name: 'Team Performance',
    type: 'team',
    generatedAt: new Date().toISOString(),
    data: [
      { name: 'Kathmandu Kings', played: 20, won: 15, lost: 5 },
      { name: 'Pokhara Warriors', played: 18, won: 10, lost: 8 },
    ],
    summary: { total: 2, avgWinRate: 0.7 },
  },
  player: {
    id: 'r3',
    name: 'Player Statistics',
    type: 'player',
    generatedAt: new Date().toISOString(),
    data: [
      { name: 'Sandeep', sport: 'cricket', matches: 50, score: 2500 },
      { name: 'Anil', sport: 'football', matches: 40, goals: 25 },
    ],
    summary: { total: 2, avgMatches: 45 },
  },
  match: {
    id: 'r4',
    name: 'Match Summary',
    type: 'match',
    generatedAt: new Date().toISOString(),
    data: [
      { home: 'Team A', away: 'Team B', score: '3-1', date: '2024-01-15' },
      { home: 'Team C', away: 'Team D', score: '2-2', date: '2024-01-16' },
    ],
    summary: { total: 2, avgGoals: 4 },
  },
  analytics: {
    id: 'r5',
    name: 'Analytics Dashboard',
    type: 'analytics',
    generatedAt: new Date().toISOString(),
    data: [
      { metric: 'users', value: 1500 },
      { metric: 'tournaments', value: 45 },
      { metric: 'matches', value: 320 },
    ],
    summary: { totalMetrics: 3, growth: 0.15 },
  },
};

export const getMockReport = (type: ReportType): ReportData => mockReports[type];
