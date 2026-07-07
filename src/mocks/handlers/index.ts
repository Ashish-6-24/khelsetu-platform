import { authHandlers } from './auth';
import { scoringHandlers } from './scoring';
import { standingHandlers } from './standings';
import { teamHandlers } from './teams';
import { tournamentHandlers } from './tournaments';
import { venueHandlers } from './venues';

export const handlers = [
  ...authHandlers,
  ...tournamentHandlers,
  ...teamHandlers,
  ...scoringHandlers,
  ...venueHandlers,
  ...standingHandlers,
];
