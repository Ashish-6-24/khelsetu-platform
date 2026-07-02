import { authHandlers } from './auth';
import { scoringHandlers } from './scoring';
import { teamHandlers } from './teams';
import { tournamentHandlers } from './tournaments';

export const handlers = [
  ...authHandlers,
  ...tournamentHandlers,
  ...teamHandlers,
  ...scoringHandlers,
];
