import { model, Schema } from 'mongoose';

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type DifficultyLevel = (typeof difficultyLevels)[number];

export interface IWorkout {
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: difficultyLevels, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true },
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
