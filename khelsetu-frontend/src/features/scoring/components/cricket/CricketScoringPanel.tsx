import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Tabs } from '@shared/components/ui/Tabs';
import type {
  CricketBall,
  CricketExtraType,
  CricketInnings,
  CricketWicketType,
} from '@shared/types/scoring';

import { useState } from 'react';

import { BatsmanSelector } from './BatsmanSelector';
import { BowlerSelector } from './BowlerSelector';
import { ExtraButtons } from './ExtraButtons';
import { InningsSummary } from './InningsSummary';
import { OverTracker } from './OverTracker';
import { PartnershipDisplay } from './PartnershipDisplay';
import { RunButtons } from './RunButtons';
import { WicketModal } from './WicketModal';

interface CricketScoringPanelProps {
  innings: CricketInnings;
  onAddBall: (ball: CricketBall) => void;
  onUndo: () => void;
}

const TABS = [
  { id: 'score', label: 'Score' },
  { id: 'batting', label: 'Batting' },
  { id: 'bowling', label: 'Bowling' },
];

export const CricketScoringPanel = ({
  innings,
  onAddBall,
  onUndo,
}: CricketScoringPanelProps) => {
  const [activeTab, setActiveTab] = useState('score');
  const [showWicketModal, setShowWicketModal] = useState(false);

  const currentBatsmen = innings.batsmen.filter((b) => !b.isOut);
  const striker = currentBatsmen.find(
    (b) => b.playerId === innings.currentStrikerId,
  );
  const nonStriker = currentBatsmen.find(
    (b) => b.playerId === innings.currentNonStrikerId,
  );
  const currentBowler = innings.bowlers.find(
    (b) => b.playerId === innings.currentBowlerId,
  );

  const currentOverBalls = innings.balls.filter(
    (b) => b.over === innings.overs && b.innings === innings.inningsNumber,
  );

  const handleRun = (runs: number) => {
    const ball = createBall(runs);
    onAddBall(ball);
  };

  const handleExtra = (type: CricketExtraType) => {
    const extraRuns = type === 'wide' || type === 'no-ball' ? 1 : 0;
    const ball = createBall(extraRuns, { type, extraRuns });
    onAddBall(ball);
  };

  const handleWicket = (
    wicketType: CricketWicketType,
    dismissedPlayerId: string,
    _newBatsmanId?: string,
  ) => {
    const ball = createBall(0, undefined, {
      type: wicketType,
      dismissedPlayerId,
    });
    onAddBall(ball);
    setShowWicketModal(false);
  };

  const createBall = (
    runs: number,
    extras?: { type: CricketExtraType; extraRuns: number },
    wicket?: { type: CricketWicketType; dismissedPlayerId: string },
  ): CricketBall => ({
    id: `ball-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    matchId: '',
    innings: innings.inningsNumber,
    over: innings.overs,
    ball: currentOverBalls.length,
    batsmanId: innings.currentStrikerId,
    bowlerId: innings.currentBowlerId,
    runs: runs + (extras?.extraRuns ?? 0),
    isExtra: !!extras,
    extraType: extras?.type,
    isWicket: !!wicket,
    wicketType: wicket?.type,
    dismissedPlayerId: wicket?.dismissedPlayerId,
    timestamp: new Date().toISOString(),
  });

  return (
    <div className="space-y-4">
      <InningsSummary innings={innings} />

      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      {activeTab === 'score' && (
        <div className="space-y-4">
          <Card>
            <CardBody>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Striker
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {striker?.playerName ?? '—'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {striker?.runs} ({striker?.balls})
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Non-Striker
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {nonStriker?.playerName ?? '—'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {nonStriker?.runs} ({nonStriker?.balls})
                    </p>
                  </div>
                </div>

                {currentBowler && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Bowler
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {currentBowler.playerName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentBowler.overs} ov, {currentBowler.wickets}/
                      {currentBowler.runs}
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <OverTracker
                balls={currentOverBalls}
                overNumber={innings.overs}
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Runs
                </h3>
                <RunButtons onRun={handleRun} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Extras / Wicket
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <ExtraButtons onExtra={handleExtra} />
                  <Button
                    variant="outline"
                    className="h-12 bg-red-50 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 font-semibold"
                    onClick={() => setShowWicketModal(true)}
                  >
                    Wicket
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onUndo} className="flex-1">
              Undo
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'batting' && (
        <Card>
          <CardBody>
            <BatsmanSelector
              batsmen={innings.batsmen}
              strikerId={innings.currentStrikerId}
              nonStrikerId={innings.currentNonStrikerId}
              onSelectStriker={() => {}}
              onSelectNonStriker={() => {}}
            />
            <div className="mt-4 space-y-2">
              {innings.batsmen
                .filter((b) => !b.isOut)
                .map((batsman) => (
                  <div
                    key={batsman.playerId}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {batsman.playerName}
                        {batsman.isOnStrike && (
                          <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                            *
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {batsman.runs} ({batsman.balls})
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        SR: {batsman.strikeRate}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'bowling' && (
        <Card>
          <CardBody>
            <BowlerSelector
              bowlers={innings.bowlers}
              currentBowlerId={innings.currentBowlerId}
              onSelectBowler={() => {}}
            />
            <div className="mt-4 space-y-2">
              {innings.bowlers.map((bowler) => (
                <div
                  key={bowler.playerId}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {bowler.playerName}
                      {bowler.isBowling && (
                        <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">
                          ●
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {bowler.overs} ov
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {bowler.wickets}/{bowler.runs} (Econ: {bowler.economy})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      <PartnershipDisplay partnership={innings.partnership} />

      <WicketModal
        isOpen={showWicketModal}
        batsmen={innings.batsmen}
        currentStrikerId={innings.currentStrikerId}
        onConfirm={handleWicket}
        onCancel={() => setShowWicketModal(false)}
      />
    </div>
  );
};
