import { Router } from 'express';

import { Activity } from '../models/Activity.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  const activities = await Activity.find()
    .populate('user', 'username firstName lastName')
    .sort({ date: -1 })
    .lean();

  response.json(activities);
});
