import { Router } from 'express';

import { Team } from '../models/Team.js';

export const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const teams = await Team.find()
    .populate('members', 'username firstName lastName')
    .populate('createdBy', 'username')
    .sort({ name: 1 })
    .lean();

  response.json(teams);
});
