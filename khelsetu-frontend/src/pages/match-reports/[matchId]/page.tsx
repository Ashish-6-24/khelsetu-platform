import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { matchService } from '@services/api/tournament';
import {
  MatchReport,
  MatchReportSkeleton,
  MatchReportEmpty,
  ReportEditor,
  useMatchReport,
} from '@features/match-reports';

export const MatchReportPage = () => {
  const { matchId } = useParams<{ matchId: string }>();

  const { data: match, isLoading: matchLoading } = useQuery({
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Match Report
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Loading report data...
          </p>
        </div>
        <MatchReportSkeleton />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Match Report
          </h1>
          {match && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Match Report
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
