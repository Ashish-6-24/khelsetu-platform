import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import { Tabs } from '@components/ui/Tabs';
import { playerService } from '@services/api/team';
import { teamService } from '@services/api/team';
import { useQuery } from '@tanstack/react-query';
import type { Player, Team } from '@types-domain/tournament';
import { ArrowLeft, Edit, Trophy } from 'lucide-react';

import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'stats', label: 'Statistics' },
];

export const PlayerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: player, isLoading: loadingPlayer } = useQuery<Player>({
    queryKey: ['player', id],
    queryFn: () => playerService.getById(id!),
    enabled: !!id,
  });

  const { data: team } = useQuery<Team>({
    queryKey: ['team', player?.teamId],
    queryFn: () => teamService.getById(player!.teamId!),
    enabled: !!player?.teamId,
  });

  if (loadingPlayer) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Player Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The player you are looking for does not exist.
        </p>
        <Button onClick={() => navigate('/players')}>Back to Players</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {player.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {player.position && (
                <Badge variant="info">{player.position}</Badge>
              )}
              {player.jerseyNumber && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  #{player.jerseyNumber}
                </span>
              )}
              {team && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  · {team.name}
                </span>
              )}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(`/players/${id}/edit`)}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500 dark:text-gray-400">Matches</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {player.stats.matches}
            </p>
          </CardBody>
        </Card>
        {player.stats.runs !== undefined && (
          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 dark:text-gray-400">Runs</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {player.stats.runs}
              </p>
            </CardBody>
          </Card>
        )}
        {player.stats.wickets !== undefined && (
          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Wickets
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {player.stats.wickets}
              </p>
            </CardBody>
          </Card>
        )}
        {player.stats.goals !== undefined && (
          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 dark:text-gray-400">Goals</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {player.stats.goals}
              </p>
            </CardBody>
          </Card>
        )}
        {player.stats.assists !== undefined && (
          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Assists
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {player.stats.assists}
              </p>
            </CardBody>
          </Card>
        )}
      </div>

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {activeTab === 'overview' && (
        <Card>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-hover)] flex items-center justify-center text-white text-3xl font-bold">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {player.name}
                  </h2>
                  {player.position && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {player.position}
                    </p>
                  )}
                  {team && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Team: {team.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Player ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {player.id}
                  </p>
                </div>
                {player.jerseyNumber && (
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Jersey Number
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      #{player.jerseyNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'stats' && (
        <Card>
          <CardBody>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Career Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {player.stats.matches}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Matches
                  </p>
                </div>
                {player.stats.runs !== undefined && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {player.stats.runs}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Runs
                    </p>
                  </div>
                )}
                {player.stats.wickets !== undefined && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {player.stats.wickets}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Wickets
                    </p>
                  </div>
                )}
                {player.stats.goals !== undefined && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {player.stats.goals}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Goals
                    </p>
                  </div>
                )}
                {player.stats.assists !== undefined && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {player.stats.assists}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Assists
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
