import { Router } from 'express';

import { LeaderboardEntry } from '../models/Leaderboard.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user', 'username firstName lastName')
    .sort({ rank: 1 })
    .lean();

  response.json(leaderboard);
});
