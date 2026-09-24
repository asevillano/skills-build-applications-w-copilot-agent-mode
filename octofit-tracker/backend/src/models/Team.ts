import { model, Schema, Types } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Team = model<ITeam>('Team', teamSchema);
