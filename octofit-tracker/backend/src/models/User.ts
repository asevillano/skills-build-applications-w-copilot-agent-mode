import { model, Schema, Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  team?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
