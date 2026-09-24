import { model, Schema, Types } from 'mongoose';

const activityTypes = [
  'Cycling',
  'Hiking',
  'Running',
  'Strength Training',
  'Swimming',
  'Walking',
] as const;

export type ActivityType = (typeof activityTypes)[number];

export interface IActivity {
  user: Types.ObjectId;
  type: ActivityType;
  durationMinutes: number;
  distanceKilometers?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: activityTypes, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKilometers: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model<IActivity>('Activity', activitySchema);
