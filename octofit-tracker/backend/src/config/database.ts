import mongoose from 'mongoose';

export const DATABASE_NAME = 'octofit_db';

export const MONGODB_URI =
  process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;

export async function connectDatabase(): Promise<typeof mongoose> {
  return mongoose.connect(MONGODB_URI);
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
