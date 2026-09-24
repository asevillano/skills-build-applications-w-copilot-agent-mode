import { Router } from 'express';

import { User } from '../models/User.js';

export const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  const users = await User.find()
    .populate('team', 'name')
    .sort({ username: 1 })
    .lean();

  response.json(users);
});
