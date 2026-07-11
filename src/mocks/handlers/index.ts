import { authHandlers } from './auth';
import { billingHandlers } from './billing';
import { mediaHandlers } from './media';
import { newsHandlers } from './news';
import { notificationsHandlers } from './notifications';
import { playersHandlers } from './players';
import { reportsHandlers } from './reports';
import { scoringHandlers } from './scoring';
import { standingHandlers } from './standings';
import { statisticsHandlers } from './statistics';
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
  ...notificationsHandlers,
  ...newsHandlers,
  ...reportsHandlers,
  ...billingHandlers,
  ...statisticsHandlers,
  ...playersHandlers,
  ...mediaHandlers,
];
