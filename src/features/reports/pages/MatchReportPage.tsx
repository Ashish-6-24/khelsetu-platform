import {
  MatchReport,
  MatchReportEmpty,
  MatchReportSkeleton,
  ReportEditor,
  useMatchReport,
} from '@features/reports/match';
import { matchService } from '@features/tournaments/services/tournament';
import { ErrorState } from '@shared/ui/ErrorState';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

export const MatchReportPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  const {
    data: match,
    isLoading: matchLoading,
    error: matchError,
  } = useQuery({
    queryKey: ['match', matchId],
    queryFn: () => matchService.getById(matchId!),
    enabled: !!matchId,
  });

  const {
    report,
    isLoading: reportLoading,
    update,
    publish,
  } = useMatchReport(matchId ?? '');

  if (matchLoading || reportLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Match Report
          </h1>
          <p className="mt-1 text-sm text-[var(--text-tertiary)]">
            Loading report data...
          </p>
        </div>
        <MatchReportSkeleton />
      </div>
    );
  }

  if (matchError) {
    return (
      <ErrorState
        title="Failed to load match report"
        message="Could not fetch match data. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!report) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Match Report
          </h1>
          {match && (
            <p className="mt-1 text-sm text-[var(--text-tertiary)]">
              {match.teamA.name} vs {match.teamB.name}
            </p>
          )}
        </div>
        <MatchReportEmpty />
      </div>
    );
  }

  const teamAName = match?.teamA.name ?? 'Team A';
  const teamBName = match?.teamB.name ?? 'Team B';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Match Report
        </h1>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          {report.title}
        </p>
      </div>

      {report.isPublished ? (
        <MatchReport
          report={report}
          teamAName={teamAName}
          teamBName={teamBName}
        />
      ) : (
        <ReportEditor
          report={report}
          teamAName={teamAName}
          teamBName={teamBName}
          onSave={(updates) => update.mutate(updates)}
          onPublish={() => publish.mutate()}
          isSaving={update.isPending}
          isPublishing={publish.isPending}
        />
      )}
    </div>
  );
};
