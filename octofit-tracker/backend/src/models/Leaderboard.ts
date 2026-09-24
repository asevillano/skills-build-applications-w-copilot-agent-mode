import { model, Schema, Types } from 'mongoose';

export interface ILeaderboardEntry {
  user: Types.ObjectId;
  rank: number;
  totalPoints: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    rank: { type: Number, required: true, min: 1, unique: true },
    totalPoints: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = model<ILeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardSchema,
);
