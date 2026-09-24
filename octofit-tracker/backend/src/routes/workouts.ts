import { Router } from 'express';

import { Workout } from '../models/Workout.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  const workouts = await Workout.find().sort({ name: 1 }).lean();

  response.json(workouts);
});
